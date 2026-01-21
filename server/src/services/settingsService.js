import { findAll, findByKey, upsert } from "../repositories/settingsRepository.js";

const ALLOWED_KEYS = new Set([
    'dual_pricing_enabled', 
    'dual_pricing_start', 
    'dual_pricing_end', 
    'rounding_policy'
])

const ROUNDING_POLICIES = new Set(['HALF_UP'])

function httpError(status, message) {
    const err = new Error(message)
    err.status = status
    return err;
}

function assertAllowedKey(key) {
    if (!ALLOWED_KEYS.has(key)) throw httpError(400, 'Invalid setting key')
}

function booleanParsing(input) {
    
    if (input === 'true') return true
    if (input === 'false') return false
    throw httpError(400, "dual_pricing_enabled must be 'true' or 'false'")
}

function isValidISODate(dateStr) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;

    const [year, month, day] = dateStr.split('-').map(Number)

    const date = new Date(Date.UTC(year, month - 1, day))

    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    )
}

function assertISODate(value, fieldName) {
    if (!isValidISODate(value)) {
        throw httpError(400, `${fieldName} must be ISO date string YYYY-MM-DD`)
    }
}

function validateRoundingPolicy(input) {
    if (!ROUNDING_POLICIES.has(input)) throw httpError(400, 'Unknown rounding policy')
}

function startOfDayUTC(isoDate) {
    return new Date(`${isoDate}T00:00:00.000Z`)
}

function endOfDayUTC(isoDate) {
    return new Date(`${isoDate}T23:59:59.999Z`)
}

function assertStartBeforeEnd(startIso, endIso) {
    if (!startIso || !endIso) return;

    if (startOfDayUTC(startIso) > endOfDayUTC(endIso)) {
        throw httpError(400, 'Invalid dual pricing period (start > end)')
    }
}

export async function getAll() {
    const rows = await findAll()

    const map = new Map(rows.map((r) => [r.key, r.value]))

    const enabledRow = map.get('dual_pricing_enabled') ?? 'false'
    const startRow = map.get('dual_pricing_start') ?? null
    const endRow = map.get('dual_pricing_end') ?? null
    const roundingRaw = map.get('rounding_policy') ?? 'HALF_UP'

    const dual_pricing_enabled = booleanParsing(enabledRow)

    if (startRow) assertISODate(startRow, 'dual_pricing_start')
    if (endRow) assertISODate(endRow, 'dual_pricing_end');

    validateRoundingPolicy(roundingRaw)

    assertStartBeforeEnd(startRow, endRow)

    return {
        dual_pricing_enabled,
        dual_pricing_start: startRow,
        dual_pricing_end: endRow,
        rounding_policy: roundingRaw,
    }
}

export async function getKey(key) {
    assertAllowedKey(key)

    const row = await findByKey(key)
    if (!row) throw httpError(404, 'Setting not found');

    return row.value;
}

export async function setNewValue(key, value) {
    assertAllowedKey(key)
    
    if (key === 'dual_pricing_enabled') {
        booleanParsing(value)
    } else if (key === 'dual_pricing_start') {
        assertISODate(value, 'dual_pricing_start')
    } else if (key === 'dual_pricing_end') {
        assertISODate(value, 'dual_pricing_end')
    } else if (key === 'rounding_policy') {
        validateRoundingPolicy(value)
    }

    if (key === 'dual_pricing_start' || key === 'dual_pricing_end') {
        const startRow = await findByKey('dual_pricing_start')
        const endRow = await findByKey('dual_pricing_end');

        const startCandidate = key === 'dual_pricing_start' ? value : startRow?.value ?? null;
        const endCandidate = key === 'dual_pricing_end' ? value : endRow?.value ?? null;

        if (startCandidate) assertISODate(startCandidate, 'dual_pricing_start')
        if (endCandidate) assertISODate(endCandidate, 'dual_pricing_end');

        assertStartBeforeEnd(startCandidate, endCandidate)
    }

    const row = await upsert(key, value)

    return { key: row.key, value: row.value }
}

export async function getDualPricingConfig() {
    const all = await getAll();

    return {
        enabled: all.dual_pricing_enabled,
        start: all.dual_pricing_start ? startOfDayUTC(all.dual_pricing_start) : null,
        end: all.dual_pricing_end ? endOfDayUTC(all.dual_pricing_end) : null,
    }
}

export async function getRoundingPolicy() {
    const raw = await getKey('rounding_policy').catch(() => 'HALF_UP')

    return ROUNDING_POLICIES.has(raw) ? raw : 'HALF_UP';
}