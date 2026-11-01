
import React, { useState } from "react";
import restaurant from "../assets/hero.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#1a1a1a]">
      {/* Left Section */}
      <div className="relative hidden w-1/2 md:block">
        <img
          src={restaurant}
          alt="Restaurant"
          className="h-full w-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Quote at Bottom */}
        <blockquote className="absolute bottom-10 px-8 text-xl italic text-white">
          "Serve customers the best food with prompt and friendly
          service in a welcoming atmosphere."
          <span className="mt-4 block text-yellow-400">
            - OderNest POS
          </span>
        </blockquote>
      </div>

      {/* Right Section */}
      <div className="flex min-h-screen w-full flex-col bg-[#1a1a1a] p-10 md:w-1/2">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-wide text-white">
            OderNest POS
          </h1>
        </div>

        {/* Dynamic Heading */}
        <h2 className="mb-10 mt-10 text-center text-4xl font-semibold text-yellow-400">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* Registration / Login Component */}
        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}

        {/* Switch Between Registration and Login */}
        <div className="mt-6 flex justify-center">
          <p className="text-sm text-[#ababab]">
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="ml-2 font-semibold text-yellow-400 hover:underline"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
