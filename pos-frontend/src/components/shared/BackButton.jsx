import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
    >
      <IoArrowBack size={22} />
    </button>
  );
};

export default BackButton;