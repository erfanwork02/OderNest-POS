import React from "react";
import BackButton from "../components/shared/BackButton";
import { FaUserCircle } from "react-icons/fa";

const Menu = () => {
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">

      {/* Left Div */}
      <div className="flex-[3]">
        <div className="flex items-center justify-between px-10 py-4">

          <div className="flex items-center gap-4">
            <BackButton />

            <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
              Menu
            </h1>
          </div>

          <div className="flex items-center justify-around gap-4">
  <FaUserCircle className="text-[#f5f5f5] text-4xl" />

  <div className="flex flex-col items-start">
    <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
      Amrit Raj
    </h1>
    <p className="text-xs text-[#ababab] font-medium">
      Admin
    </p>
  </div>
</div>

        </div>
      </div>

      {/* Right Div */}
      <div className="flex-[2] bg-blue-500">

      </div>

    </section>
  );
};

export default Menu;