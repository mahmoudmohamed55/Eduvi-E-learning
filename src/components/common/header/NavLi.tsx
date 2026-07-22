import { NavLink } from "react-router-dom";

interface NavLiProps {
  name: string;
  onclick?: () => void;
  icon?: React.ReactNode;
}
export const NavLi = ({ name, onclick, icon }: NavLiProps) => {
  return (
    <li className="group relative">
      <NavLink
        to={name.toLowerCase()}
        onClick={onclick}
        className={({ isActive }) =>
          `mobile-link ${
            isActive ? "text-primary-600" : "hover:text-primary-600"
          }`
        }
        end
      >
        {name}
        {icon && <span className="ml-2">{icon}</span>}
      </NavLink>
    </li>
  );
};
