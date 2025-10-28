import React from "react";
import { LogOut, PlusCircle, Eye } from "lucide-react";

const Sidebar = ({ activeSection, setActiveSection, onLogout }) => {
  const menuItems = [
    { id: "view", label: "View Products", icon: <Eye size={20} /> },
    { id: "add", label: "Add Product", icon: <PlusCircle size={20} /> },
  ];

  return (
    <>
      {/* ===== Desktop / Tablet Sidebar ===== */}
      <aside className="hidden md:flex w-64 bg-black text-white flex-col justify-between p-4">
        {/* Top Menu */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-yellow-500">
            Admin Panel
          </h2>

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-2 w-full text-left py-3 px-4 rounded-md mb-2 transition ${
                activeSection === item.id
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 py-3 mt-6 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* ===== Mobile Bottom Navigation ===== */}
      <div className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around items-center p-2 md:hidden z-50">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex flex-col items-center text-xs transition ${
              activeSection === item.id
                ? "text-yellow-500"
                : "text-white hover:text-yellow-500"
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-1">{item.label}</span>
          </button>
        ))}

        <button
          onClick={onLogout}
          className="flex flex-col items-center text-xs text-red-500 hover:text-red-600"
        >
          <LogOut size={20} />
          <span className="text-[10px] mt-1">Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;