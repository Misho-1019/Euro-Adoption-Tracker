import React, { useContext, useState } from "react";
import { Outlet, NavLink } from "react-router";
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  ShoppingBasket,
  ShieldCheck,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  Lock,
} from "lucide-react";
import { UserContext } from "../../context/UserContext";

export default function AppLayout() {
  const { email } = useContext(UserContext)
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((v) => !v);
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Products", path: "/products", icon: Package },
    { name: "Exchange Rate", path: "/rate", icon: TrendingUp },
    { name: "Basket Quote", path: "/basket", icon: ShoppingBasket },
    { name: "Compliance", path: "/compliance", icon: ShieldCheck },
    { name: "Analytics", path: "/analytics", icon: BarChart2 },
  ];

  const adminItems = [
    { name: "Admin Overview", path: "/admin", icon: Lock },
    { name: "Admin Rate", path: "/admin/rate", icon: TrendingUp },
    { name: "Admin Products", path: "/admin/products", icon: Package },
    { name: "Admin Categories", path: "/admin/categories", icon: Layers },
    { name: "Admin Settings", path: "/admin/settings", icon: Settings },
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      end={item.path === "/" || item.path === "/admin"}
      className={({ isActive }) =>
        `
        flex items-center px-4 py-3 mb-1 text-sm font-medium transition-colors
        ${
          isActive
            ? "bg-blue-800 text-white border-l-4 border-yellow-400"
            : "text-blue-100 hover:bg-blue-800 hover:text-white border-l-4 border-transparent"
        }
        ${isCollapsed ? "justify-center px-2" : ""}
      `
      }
    >
      <item.icon className={`h-5 w-5 ${isCollapsed ? "" : "mr-3"}`} />
      <span
        className={`whitespace-nowrap transition-opacity duration-300 ${
          isCollapsed ? "hidden opacity-0 w-0" : "block opacity-100"
        }`}
      >
        {item.name}
      </span>
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-[#003399] flex flex-col shadow-xl border-r border-blue-900
          ${isCollapsed ? "w-18" : "w-70"}
        `}
      >
        {/* Brand */}
        <div
          className={`h-16 flex items-center ${
            isCollapsed ? "justify-center" : "px-6"
          } bg-[#002b80] border-b border-blue-800`}
        >
          <div className="flex items-center justify-center bg-yellow-400 text-[#003399] h-8 w-8 rounded-sm font-bold text-xs">
            EU
          </div>
          <span
            className={`ml-3 text-white font-semibold text-lg tracking-wide transition-all duration-300 ${
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            EuroTracker
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <div className="mb-4">
            {!isCollapsed && (
              <h3 className="px-6 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
                Main Menu
              </h3>
            )}
            {navItems.map((item) => (
              <NavItem key={item.path} item={item} />
            ))}
          </div>

          {email && (
            <div className="mt-6">
              {!isCollapsed && (
                <h3 className="px-6 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
                  Administration
                </h3>
              )}
              {adminItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          )}
        </nav>

        {/* Footer / User */}
        <div className="p-4 bg-[#002266] border-t border-blue-900">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-medium ring-2 ring-blue-600">
              {email ? "AD" : "?"}
            </div>

            <div
              className={`ml-3 transition-all duration-300 ${
                isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
              }`}
            >
              <p className="text-sm font-medium text-white truncate">
                {email ? "Administrator" : "Guest"}
              </p>
              <p className="text-xs text-blue-300 truncate">
                {email ? "admin@euro-inst.eu" : "Not signed in"}
              </p>
            </div>
          </div>

          {!isCollapsed && (
            <div className="mt-3 flex gap-2">
              {!email ? (
                <>
                  <NavLink
                    to="/login"
                    className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg border border-blue-800/40 text-blue-100 hover:bg-blue-800/60"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg bg-[#FFD617] text-[#003399] hover:bg-yellow-300"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to='/logout'
                  className="w-full text-center text-xs font-semibold px-3 py-2 rounded-lg border border-blue-800/40 text-blue-100 hover:bg-blue-800/60"
                >
                  Logout
                </NavLink>
              )}
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-20 bg-white text-[#003399] p-1 rounded-full shadow-md border border-slate-200 hover:bg-slate-100"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Main */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300
          ${isCollapsed ? "ml-18" : "ml-70"}
        `}
      >
        <div className="h-full w-full p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}