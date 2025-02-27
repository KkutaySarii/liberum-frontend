"use client";
import React from "react";

import NavbarHome from "@/components/NavbarHome";
import HomeScreen from "@/components/home";

const Home = () => {
  return (
    <div className="w-full min-h-[calc(100vh_-_120px)] bg-dark relative">
      <NavbarHome />
      <HomeScreen />
    </div>
  );
};

export default Home;
