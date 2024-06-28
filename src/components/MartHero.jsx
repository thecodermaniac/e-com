import React from "react";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero1 from "../assets/hero1.png";

const MartHero = () => {
  return (
    <section>
      <div className="bg-white text-black pt-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
            <h1 className="text-3xl md:text-5xl p-2 text-mainColor tracking-loose">
              9 to 5 Mart
            </h1>
            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
              Mart : Is All You Need
            </h2>
            <p className="text-sm md:text-base text-black mb-4">
              Explore your favourite accesories to clothes and register now to
              enjoy exiciting discounts.
            </p>
            <a
              href="#"
              className="bg-transparent hover:bg-mainColor text-mainColor hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-mainColor hover:border-transparent"
            >
              Explore Now
            </a>
          </div>
          <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
            <div className="h-48 flex flex-wrap content-center justify-around">
              <div>
                <img
                  className="mt-24 hidden xl:block h-80 rotate-[-24deg] "
                  src={hero1}
                />
              </div>
              <div>
                <img
                  className="inline-block mt-24 md:mt-0 p-8 md:p-0 h-96 rotate-[-24deg]"
                  src={hero2}
                />
              </div>
              <div>
                <img
                  className="mt-24 hidden lg:block h-80 rotate-[-24deg] ml-8"
                  src={hero3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MartHero;
