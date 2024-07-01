import React from "react";
import { collectionImages } from "../data/images";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
const CategorySwipe = () => {
  return (
    <section className="flex md:flex-row flex-col-reverse gap-5 relative h-screen">
      <div className="md:flex-[1.5] flex justify-end items-center w-full h-full">
        <div className="md:w-[90%] h-[60%] w-full">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 1,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            loop={true}
            autoplay={{ delay: 1000, disableOnInteraction: true }}
            modules={[EffectCoverflow, Autoplay]}
            className="h-full"
          >
            {collectionImages.map((value) => {
              return (
                <SwiperSlide className="w-1/2 relative flex items-center rounded-lg">
                  <img
                    src={value.path}
                    alt=""
                    className=" object-cover h-full w-full rounded-lg"
                  />
                  <div className=" absolute w-2/3 h-full top-0 left-1/2 translate-x-[-50%] rounded-xl">
                    <span className="absolute bottom-2 left-1/2 translate-x-[-50%] text-xl text-white">
                      {value.name}
                    </span>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-center items-start">
        <h1 className="2xl:text-[64px] sm:text-[40px] text-[40px] font-extrabold;">
          Check out latest Collections
        </h1>

        <p className="text-[27px] text-black-100 font-light mt-5">
          With So much to choose from you never run out of options.
        </p>
        <Link className="py-3 " to={"/All"}>
          Shop now
        </Link>
      </div>
    </section>
  );
};

export default CategorySwipe;
