import React from 'react';

const Products = () => {
  // Mock data for the products table
  const products = [
    { id: 1, name: 'White Bread (Standard)', category: 'Food Staples', unit: 'Loaf (500g)', priceBgn: '1.45', priceEur: '0.74', date: '2025-01-20' },
    { id: 2, name: 'Cow Milk 3%', category: 'Dairy', unit: '1 Liter', priceBgn: '2.80', priceEur: '1.43', date: '2025-01-22' },
    { id: 3, name: 'Sunflower Oil', category: 'Cooking Essentials', unit: '1 Liter', priceBgn: '3.20', priceEur: '1.64', date: '2025-01-18' },
    { id: 4, name: 'Euro-Super 95', category: 'Fuels', unit: '1 Liter', priceBgn: '2.58', priceEur: '1.32', date: '2025-01-24' },
    { id: 5, name: 'Natural Gas (Household)', category: 'Energy', unit: 'm³', priceBgn: '1.15', priceEur: '0.59', date: '2025-01-15' },
    { id: 6, name: 'White Cheese (Bulgarian)', category: 'Dairy', unit: '1 kg', priceBgn: '14.50', priceEur: '7.41', date: '2025-01-21' },
    { id: 7, name: 'Eggs (size M)', category: 'Food Staples', unit: 'Pack (10)', priceBgn: '4.90', priceEur: '2.51', date: '2025-01-23' },
  ];

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-sans text-gray-800">
      
      {/* Page Header */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-[#003399]">Products</h1>
        <p className="mt-2 text-gray-600">Overview of monitored goods and their official exchange rates.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        
        {/* Search Input */}
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search by product name..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#003399] focus:border-[#003399] transition-colors"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Add Product Button */}
        <button 
          className="bg-[#003399] hover:bg-[#002277] text-white px-6 py-2 rounded-sm font-medium shadow-sm transition-colors duration-200 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Table Container - Horizontal scroll on mobile */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#003399] text-white">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Product Name</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Category</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Unit</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Price (BGN)</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Price (EUR)</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Effective Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.unit}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{product.priceBgn}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{product.priceEur}</td>
                  <td className="px-6 py-4 text-right text-gray-500 tabular-nums">{product.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Simple Pagination Mock */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
          <span>Showing 1 to {products.length} of {products.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-sm hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-300 rounded-sm hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Products;
