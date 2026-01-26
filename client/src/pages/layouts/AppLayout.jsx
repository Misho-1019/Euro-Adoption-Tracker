import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  ShoppingBasket, 
  ShieldCheck, 
  BarChart2, 
  Settings, 
  Menu, 
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Layers, 
  Lock
} from 'lucide-react';

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Exchange Rate', path: '/rate', icon: TrendingUp },
    { name: 'Basket Quote', path: '/basket', icon: ShoppingBasket },
    { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
    { name: 'Analytics', path: '/analytics', icon: BarChart2 },
  ];

  const adminItems = [
    { name: 'Admin Overview', path: '/admin', icon: Lock },
    { name: 'Admin Rate', path: '/admin/rate', icon: TrendingUp },
    { name: 'Admin Products', path: '/admin/products', icon: Package },
    { name: 'Admin Categories', path: '/admin/categories', icon: Layers },
    { name: 'Admin Settings', path: '/admin/settings', icon: Settings },
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      end={item.path === '/' || item.path === '/admin'} 
      className={({ isActive }) => `
        flex items-center px-4 py-3 mb-1 text-sm font-medium transition-colors duration-200
        ${isActive 
          ? 'bg-blue-800 text-white border-l-4 border-yellow-400' 
          : 'text-blue-100 hover:bg-blue-800 hover:text-white border-l-4 border-transparent'
        }
        ${isCollapsed ? 'justify-center px-2' : ''}
      `}
    >
      <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} strokeWidth={1.5} />
      <span className={`whitespace-nowrap transition-opacity duration-300 ${isCollapsed ? 'hidden opacity-0 w-0' : 'block opacity-100'}`}>
        {item.name}
      </span>
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      
      {/* Fixed Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out bg-[#003399] flex flex-col shadow-xl border-r border-blue-900
          ${isCollapsed ? 'w-18' : 'w-70'}
        `}
      >
        {/* Header */}
        <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'px-6'} bg-[#002b80] border-b border-blue-800`}>
          <div className="flex items-center justify-center bg-yellow-400 text-[#003399] h-8 w-8 rounded-sm font-bold text-xs shrink-0">
            EU
          </div>
          <span className={`ml-3 text-white font-semibold text-lg tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            EuroTracker
          </span>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-transparent">
          
          <div className="mb-2">
            {!isCollapsed && (
              <h3 className="px-6 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
                Main Menu
              </h3>
            )}
            {navItems.map(item => <NavItem key={item.path} item={item} />)}
          </div>

          <div className="mt-6 mb-2">
             {!isCollapsed && (
              <h3 className="px-6 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
                Administration
              </h3>
            )}
            {adminItems.map(item => <NavItem key={item.path} item={item} />)}
          </div>

        </nav>

        {/* Footer / User User */}
        <div className={`p-4 bg-[#002266] border-t border-blue-900 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-medium ring-2 ring-blue-600">
              AD
            </div>
            <div className={`ml-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
               <p className="text-sm font-medium text-white truncate">Administrator</p>
               <p className="text-xs text-blue-300 truncate">admin@euro-inst.eu</p>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-white text-[#003399] p-1 rounded-full shadow-md border border-slate-200 hover:bg-slate-100 focus:outline-none z-50 transform transition-transform"
          aria-label="Toggle Sidebar"
        >
           {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

      </aside>

      {/* Main Content Area */}
      <main 
        className={`
          flex-1 min-h-screen transition-all duration-300 ease-in-out
          ${isCollapsed ? 'ml-18' : 'ml-70'}
        `}
      >
        <div className="h-full w-full">
           <Outlet />
        </div>
      </main>

    </div>
  );
};