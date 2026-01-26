import React from 'react';
import { 
  FolderIcon, 
  PlusIcon,
  PencilSquareIcon,
  ArchiveBoxIcon,
  TagIcon
} from '@heroicons/react/24/outline';

const AdminCategories = () => {
  // Mock Data
  const categories = [
    { id: 1, name: 'Bakery', description: 'Breads, pastries, and baked goods', count: 142, isCore: true },
    { id: 2, name: 'Dairy', description: 'Milk, cheese, yogurt, and butter', count: 215, isCore: true },
    { id: 3, name: 'Meat & Poultry', description: 'Fresh and processed meat products', count: 189, isCore: true },
    { id: 4, name: 'Produce', description: 'Fresh fruits and vegetables', count: 310, isCore: true },
    { id: 5, name: 'Pantry', description: 'Spices, oils, canned goods, pasta', count: 425, isCore: false },
    { id: 6, name: 'Beverages', description: 'Water, juices, sodas, and alcohol', count: 186, isCore: false },
    { id: 7, name: 'Frozen', description: 'Ice cream, frozen meals, and vegetables', count: 98, isCore: false },
    { id: 8, name: 'Household', description: 'Cleaning supplies and paper products', count: 64, isCore: false },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Manage Categories</h1>
          <p className="mt-2 text-slate-500">Organize product classification and departments.</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Card Header & Toolbar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-slate-900">All Categories</h3>
             <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
               Total: {categories.length}
             </span>
          </div>

          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#003399] text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <PlusIcon className="w-5 h-5" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Categories List */}
        <div className="divide-y divide-slate-100">
          {categories.map((category) => (
            <div key={category.id} className="p-4 sm:px-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              {/* Info Column */}
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-slate-100 rounded-lg hidden sm:block">
                  <FolderIcon className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base font-semibold text-slate-900">{category.name}</h4>
                    {category.isCore && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100/60 text-yellow-800 border border-yellow-200">
                        <TagIcon className="w-3 h-3 mr-1" />
                        Core
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{category.description}</p>
                </div>
              </div>

              {/* Stats & Actions Column */}
              <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/2">
                 <div className="flex flex-col sm:items-end">
                    <span className="text-sm font-medium text-slate-900">{category.count}</span>
                    <span className="text-xs text-slate-500">products</span>
                 </div>

                 <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                    <button className="flex items-center text-sm font-medium text-slate-600 hover:text-[#003399] px-2 py-1 rounded hover:bg-slate-100 transition-colors">
                      <PencilSquareIcon className="w-4 h-4 mr-1.5" />
                      Rename
                    </button>
                    <button className="flex items-center text-sm font-medium text-slate-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors">
                      <ArchiveBoxIcon className="w-4 h-4 mr-1.5" />
                      Archive
                    </button>
                 </div>
              </div>

            </div>
          ))}
        </div>
        
        {/* Footer info (optional visual balance) */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
           <span>Core categories cannot be archived.</span>
           <span>Last updated: just now</span>
        </div>

      </div>
    </div>
  );
};

export default AdminCategories;
