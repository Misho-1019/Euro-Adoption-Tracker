import React from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  PencilSquareIcon,
  CurrencyEuroIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';

const AdminProducts = () => {
  // Mock Data
  const products = [
    { id: 1, name: 'White Bread', category: 'Bakery', unit: 'Loaf (500g)', priceBgn: 1.80, priceEur: 0.92, effectiveDate: '2024-01-01' },
    { id: 2, name: 'Cow Cheese', category: 'Dairy', unit: 'kg', priceBgn: 16.50, priceEur: 8.44, effectiveDate: '2024-01-15' },
    { id: 3, name: 'Yogurt 3.6%', category: 'Dairy', unit: '400g', priceBgn: 1.45, priceEur: 0.74, effectiveDate: '2024-01-01' },
    { id: 4, name: 'Sunflower Oil', category: 'Pantry', unit: 'Liter', priceBgn: 3.20, priceEur: 1.64, effectiveDate: '2023-12-20' },
    { id: 5, name: 'Chicken Breast', category: 'Meat', unit: 'kg', priceBgn: 12.90, priceEur: 6.60, effectiveDate: '2024-01-10' },
    { id: 6, name: 'Tomatoes', category: 'Produce', unit: 'kg', priceBgn: 4.50, priceEur: 2.30, effectiveDate: '2024-01-26' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Products</h1>
          <p className="mt-2 text-slate-500">Review and update the product catalog and pricing.</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search & Filter */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border-slate-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2"
                placeholder="Search products..."
              />
            </div>
            
            <div className="relative">
               <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                 <FunnelIcon className="w-4 h-4 text-slate-500" />
                 <span>Filter</span>
               </button>
            </div>
          </div>

          {/* Actions */}
          <div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#003399] text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
              <PlusIcon className="w-5 h-5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Unit
                </th>
                 <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price (BGN)
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Price (EUR)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider pl-8">
                  Effective From
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {product.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-900">
                    {product.priceBgn.toFixed(2)} лв.
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-[#003399] font-medium">
                    €{product.priceEur.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 pl-8">
                    {product.effectiveDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                       <button className="text-slate-400 hover:text-[#003399] p-1">
                          <PencilSquareIcon className="w-5 h-5" />
                       </button>
                       <button className="text-slate-400 hover:text-[#003399] p-1">
                          <CurrencyEuroIcon className="w-5 h-5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination (Mock) */}
        <div className="bg-white px-4 py-3 border-t border-slate-200 flex items-center justify-between sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of <span className="font-medium">1,248</span> results
              </p>
            </div>
            <div>
               <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                  Previous
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">
                  3
                </button>
                 <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-slate-300 bg-white text-sm font-medium text-slate-500 hover:bg-slate-50">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
