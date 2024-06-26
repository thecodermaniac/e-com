import React, { useEffect } from "react";
import QuickView from "../components/QuickView";
import CategorySwipe from "../components/CategorySwipe";
import MartHero from "../components/MartHero";
// import Hero from "../components/Hero";
// import ClientVerdicts from "../components/ClientVerdicts/ClientVerdicts";
// import CarHero from "../components/CarHero";

const Home = () => {
  return (
    <>
      <MartHero />
      <CategorySwipe />
      <QuickView />
    </>
  );
};

export default Home;
