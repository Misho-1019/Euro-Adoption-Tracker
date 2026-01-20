import { PrismaClient, Prisma } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Helpers (Prisma.Decimal is decimal.js under the hood)
const D = (v) => new Prisma.Decimal(v);

function eurExactFromBgn(priceBgn, rateBgnPerEur) {
  // fit into Decimal(18,8)
  return D(priceBgn).div(D(rateBgnPerEur)).toDecimalPlaces(8, Prisma.Decimal.ROUND_HALF_UP);
}

function eurDisplayFromExact(eurExact) {
  // fit into Decimal(18,2)
  return D(eurExact).toDecimalPlaces(2, Prisma.Decimal.ROUND_HALF_UP);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Deterministic-ish random (so seeds are stable)
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function main() {
  const rand = mulberry32(20260120);

  // -------------- CONFIG --------------
  const roundingPolicy = "HALF_UP";
  const rate = "1.95583"; // Bulgaria fixed rate
  const rateValidFrom = new Date("2026-01-01T00:00:00.000Z");

  const baselineDate = new Date("2026-01-01T00:00:00.000Z");

  // -------------- RESET (catalog only) --------------
  // Keep auth tables intact. Wipe only the catalog data.
  await prisma.productPrice.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.exchangeRate.deleteMany();

  // -------------- APP SETTINGS (defaults) --------------
  // Stored as strings; services will interpret later.
  const defaultSettings = [
    ["dual_pricing_enabled", "true"],
    ["dual_pricing_start", "2025-01-01"],
    ["dual_pricing_end", "2026-12-31"],
    ["rounding_policy", "HALF_UP"],
  ];

  for (const [key, value] of defaultSettings) {
    await prisma.appSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  // -------------- EXCHANGE RATE --------------
  await prisma.exchangeRate.create({
    data: {
      rateBgnPerEur: D(rate),
      validFrom: rateValidFrom,
    },
  });

  // -------------- CATEGORIES --------------
  const categoryNames = [
    "Food",
    "Dairy",
    "Meat",
    "Vegetables",
    "Drinks",
    "Household",
    "Hygiene",
    "Baby",
    "Pharmacy",
    "Other",
  ];

  const categories = await prisma.category.createMany({
    data: categoryNames.map((name) => ({ name })),
  });

  // Fetch created categories with IDs
  const createdCategories = await prisma.category.findMany({ orderBy: { id: "asc" } });

  // -------------- PRODUCTS (~100) --------------
  // A small catalog that feels realistic (units matter for basket)
  const catalog = [
    // Food
    { name: "Bread", unit: "pcs", cat: "Food" },
    { name: "Rice", unit: "kg", cat: "Food" },
    { name: "Pasta", unit: "kg", cat: "Food" },
    { name: "Flour", unit: "kg", cat: "Food" },
    { name: "Sugar", unit: "kg", cat: "Food" },
    { name: "Salt", unit: "kg", cat: "Food" },
    { name: "Eggs", unit: "pcs", cat: "Food" },
    { name: "Sunflower oil", unit: "l", cat: "Food" },
    { name: "Butter cookies", unit: "pcs", cat: "Food" },

    // Dairy
    { name: "Milk 1L", unit: "l", cat: "Dairy" },
    { name: "Yogurt", unit: "pcs", cat: "Dairy" },
    { name: "White cheese", unit: "kg", cat: "Dairy" },
    { name: "Yellow cheese", unit: "kg", cat: "Dairy" },
    { name: "Butter", unit: "pcs", cat: "Dairy" },

    // Meat
    { name: "Chicken breast", unit: "kg", cat: "Meat" },
    { name: "Pork", unit: "kg", cat: "Meat" },
    { name: "Minced meat", unit: "kg", cat: "Meat" },
    { name: "Sausage", unit: "kg", cat: "Meat" },

    // Vegetables
    { name: "Potatoes", unit: "kg", cat: "Vegetables" },
    { name: "Tomatoes", unit: "kg", cat: "Vegetables" },
    { name: "Cucumbers", unit: "kg", cat: "Vegetables" },
    { name: "Onions", unit: "kg", cat: "Vegetables" },
    { name: "Apples", unit: "kg", cat: "Vegetables" },
    { name: "Bananas", unit: "kg", cat: "Vegetables" },

    // Drinks
    { name: "Mineral water 1.5L", unit: "pcs", cat: "Drinks" },
    { name: "Coffee", unit: "pcs", cat: "Drinks" },
    { name: "Tea", unit: "pcs", cat: "Drinks" },
    { name: "Juice", unit: "l", cat: "Drinks" },

    // Household
    { name: "Dish soap", unit: "pcs", cat: "Household" },
    { name: "Laundry detergent", unit: "pcs", cat: "Household" },
    { name: "Garbage bags", unit: "pcs", cat: "Household" },
    { name: "Paper towels", unit: "pcs", cat: "Household" },

    // Hygiene
    { name: "Toothpaste", unit: "pcs", cat: "Hygiene" },
    { name: "Shampoo", unit: "pcs", cat: "Hygiene" },
    { name: "Soap", unit: "pcs", cat: "Hygiene" },
    { name: "Toilet paper", unit: "pcs", cat: "Hygiene" },

    // Baby
    { name: "Diapers", unit: "pcs", cat: "Baby" },
    { name: "Baby wipes", unit: "pcs", cat: "Baby" },

    // Pharmacy
    { name: "Pain reliever", unit: "pcs", cat: "Pharmacy" },
    { name: "Vitamins", unit: "pcs", cat: "Pharmacy" },

    // Other
    { name: "Light bulb", unit: "pcs", cat: "Other" },
    { name: "Batteries", unit: "pcs", cat: "Other" },
  ];

  // Expand to ~100 by generating variants (sizes/brands)
  const generated = [];
  const variants = ["Basic", "Premium", "Eco", "Family", "Mini"];
  for (const item of catalog) {
    generated.push(item);
    // Add 1–3 variants
    const k = 1 + Math.floor(rand() * 3);
    for (let i = 0; i < k; i++) {
      const v = variants[Math.floor(rand() * variants.length)];
      generated.push({
        ...item,
        name: `${item.name} (${v})`,
      });
    }
  }

  // Trim/extend to exactly 100 products
  while (generated.length < 100) {
    const base = generated[Math.floor(rand() * generated.length)];
    generated.push({ ...base, name: `${base.name} v${generated.length}` });
  }
  const productsData = generated.slice(0, 100);

  const catIdByName = new Map(createdCategories.map((c) => [c.name, c.id]));

  await prisma.product.createMany({
    data: productsData.map((p) => ({
      name: p.name,
      unit: p.unit,
      categoryId: catIdByName.get(p.cat),
    })),
  });

  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });

  // -------------- PRICES (baseline + history) --------------
  // Baseline BGN range: small items ~0.80–6.00, kg items ~2–25, detergents ~5–30, etc.
  function basePriceForUnit(unit) {
    const r = rand();
    if (unit === "pcs") return clamp(0.8 + r * 15, 0.8, 25);
    if (unit === "l") return clamp(1.2 + r * 10, 1.2, 18);
    if (unit === "kg") return clamp(1.5 + r * 20, 1.5, 35);
    return clamp(1 + r * 10, 1, 20);
  }

  // Create baseline price for every product
  const baselineRows = products.map((p) => {
    const bgn = D(basePriceForUnit(p.unit)).toDecimalPlaces(4, Prisma.Decimal.ROUND_HALF_UP);
    const eurExact = eurExactFromBgn(bgn, rate);
    const eurDisplay = eurDisplayFromExact(eurExact);

    return {
      productId: p.id,
      priceBgn: bgn,
      rateBgnPerEur: D(rate),
      priceEurExact: eurExact,
      priceEurDisplay: eurDisplay,
      roundingPolicy,
      effectiveFrom: baselineDate,
    };
  });

  // Insert baseline in chunks (safe for large datasets)
  const chunkSize = 200;
  for (let i = 0; i < baselineRows.length; i += chunkSize) {
    await prisma.productPrice.createMany({ data: baselineRows.slice(i, i + chunkSize) });
  }

  // Add history rows for ~25 products
  const productsForHistory = [];
  for (const p of products) {
    if (rand() < 0.25) productsForHistory.push(p);
  }

  // Ensure at least 25
  while (productsForHistory.length < 25) {
    productsForHistory.push(products[Math.floor(rand() * products.length)]);
  }

  // Pick a few products for spikes
  const spikeSet = new Set();
  for (let i = 0; i < 6; i++) {
    spikeSet.add(productsForHistory[Math.floor(rand() * productsForHistory.length)].id);
  }

  const historyRows = [];
  for (const p of productsForHistory) {
    // Get baseline bgn for this product from baselineRows
    const baseRow = baselineRows.find((x) => x.productId === p.id);
    let currentBgn = D(baseRow.priceBgn);

    // 3–6 additional monthly points
    const points = 3 + Math.floor(rand() * 4);

    for (let k = 1; k <= points; k++) {
      const date = addDays(baselineDate, 30 * k);

      // normal change: -3% to +8%
      let pct = -0.03 + rand() * 0.11;

      // spikes for selected products: once, do +25% to +90%
      if (spikeSet.has(p.id) && k === points) {
        pct = 0.25 + rand() * 0.65;
      }

      currentBgn = currentBgn.mul(D(1).plus(D(pct))).toDecimalPlaces(4, Prisma.Decimal.ROUND_HALF_UP);

      const eurExact = eurExactFromBgn(currentBgn, rate);
      const eurDisplay = eurDisplayFromExact(eurExact);

      historyRows.push({
        productId: p.id,
        priceBgn: currentBgn,
        rateBgnPerEur: D(rate),
        priceEurExact: eurExact,
        priceEurDisplay: eurDisplay,
        roundingPolicy,
        effectiveFrom: date,
      });
    }
  }

  for (let i = 0; i < historyRows.length; i += chunkSize) {
    await prisma.productPrice.createMany({ data: historyRows.slice(i, i + chunkSize) });
  }

  // Small summary
  const categoryCount = await prisma.category.count();
  const productCount = await prisma.product.count();
  const priceCount = await prisma.productPrice.count();
  const rateCount = await prisma.exchangeRate.count();

  console.log("✅ Seed complete");
  console.log({ categoryCount, productCount, rateCount, priceCount });
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });

