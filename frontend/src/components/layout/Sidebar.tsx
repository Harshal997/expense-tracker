import { NavLink } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: Props) => {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          w-64
          border-r
          border-b
          z-50
          transform
          transition-transform
          duration-300
        bg-gray-200 rounded
        dark:bg-gray-800
        dark:border-gray-700
        text-gray-900 dark:text-white
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="p-6">
          <h2 className="font-bold text-xl mb-8 text-black/70">
            Expense Tracker
          </h2>

          <nav className="space-y-4 mt-6">
            <NavLink
              to="/"
              onClick={onClose}
              className="block p-3 rounded text-white bg-black/70 hover:bg-white/50 hover:text-black"
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/expenses"
              onClick={onClose}
              className="block p-3 rounded text-white bg-black/70 hover:bg-white/50 hover:text-black"
            >
              Expenses
            </NavLink>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
