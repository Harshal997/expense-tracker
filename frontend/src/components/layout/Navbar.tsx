import { Menu, Sun, Moon } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import { useTheme } from "../../context/ThemeContext";

interface Props {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: Props) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className=" h-16 border-b px-6 flex items-center justify-between bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden">
          <Menu size={24} />
        </button>
        <button onClick={toggleTheme} className="border rounded p-2">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <h3 className="font-semibold text-md md:text-lg lg:text-xl text-gray-900 dark:text-white">
          Welcome, {user?.name}
        </h3>
      </div>

      <button
        onClick={logout}
        className="border rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
