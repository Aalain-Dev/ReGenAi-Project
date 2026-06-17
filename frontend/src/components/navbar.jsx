import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-8 py-4 shadow-lg pb-3">
      <div className=" mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">SkillGrowth</h1>

        <div className="flex gap-6">
          <NavLink
            to="/dashboard/home"
            end
            className={({ isActive }) =>
              isActive
                ? "text-[#006A61] font-bold underline pb-1"
                : "text-gray-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard/reports"
            className={({ isActive }) =>
               isActive
                ? "text-[#006A61] font-bold underline pb-1"
                : "text-gray-700"
            }
          >
            Reports
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;