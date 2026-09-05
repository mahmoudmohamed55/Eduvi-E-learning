
import { NavLink, useNavigate } from "react-router-dom";
import {
  BookOpen,
  LogOut,
  Tags,
  Users,
  X,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { logout } from "@store/auth/authSlice";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profile = useAppSelector(
    (state) => state.auth.profile
  );

  const links = [
    {
      name: "Users",
      path: "/dashboard",
      icon: Users,
    },
    {
      name: "Categories",
      path: "/dashboard/categories",
      icon: Tags,
    },
    {
      name: "Courses",
      path: "/dashboard/courses",
      icon: BookOpen,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-ink-950/40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-surface-300 bg-surface-50 transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-surface-300 px-6">
          <h1 className="text-2xl font-bold text-primary-600">
            LMS
          </h1>

          {/* Close button - Mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-ink-500 transition-colors hover:bg-primary-50 hover:text-primary-600 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="custom-scroll flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {links.map(({ name, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-primary-600 text-surface-50 shadow-sm"
                      : "text-ink-600 hover:bg-primary-50 hover:text-primary-600"
                  }`
                }
              >
                <Icon size={20} />
                <span>{name}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User Section */}
        <div className="shrink-0 border-t border-surface-300 p-4">
          <div className="mb-3 flex items-center gap-3">
            <img
              src={
                profile?.avatar ||
                "/avatar-placeholder.png"
              }
              alt={profile?.full_name || "User"}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink-900">
                {profile?.full_name || "Admin"}
              </p>

              <p className="text-xs capitalize text-ink-500">
                {profile?.role || "admin"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-600 transition-colors duration-200 hover:bg-error-500/10 hover:text-error-500"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

