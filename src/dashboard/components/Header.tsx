
import { Menu } from "lucide-react";
import { LuBookOpenText } from "react-icons/lu";
import { Link } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-surface-300 bg-surface-50/95 px-4 backdrop-blur sm:px-6 lg:px-8">
    
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="mr-3 rounded-xl p-2 text-ink-600 transition-colors hover:bg-primary-50 hover:text-primary-600 lg:hidden"
      >
        <Menu size={24} />
      </button>

     
      <div>
               <Link to="/" className="flex items-center gap-2">
          <LuBookOpenText
            size={30}
            className="text-secondary-500"
            strokeWidth={2.3}
          />

          <h2 className="text-3xl font-bold text-ink-900">
            <span className="text-primary-600">Edu</span>vi
          </h2>
        </Link>

        <p className="hidden text-sm text-ink-500 sm:block">
          Manage your platform
        </p>
      </div>
    </header>
  );
};

export default Header;

