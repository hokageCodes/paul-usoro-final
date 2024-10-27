/* eslint-disable react/prop-types */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TimelineSection from "../timeline/TimelineSection";

const AboutUsIntro = () => {
  return (
    <section className="bg-custom-color1 font-satoshi">
      <div className="max-w-7xl px-4 pb-8 pt-[60px] mx-auto text-black lg:pt-[60px]">
        <div className="text-[35px] md:text-[36px] lg:text-[44px] xl:text-[52px] leading-[45px] md:leading-[52px] lg:leading-[67px]">
          <h1 className="font-bold text-black">We represent</h1>
          <p>
            a <span className="text-[#01553d] font-bold">Commitment, Integrity,</span> and a{" "}
            <span className="text-[#01553d] font-bold">Solution</span> to the{" "}
            <span className="font-semibold text-black">
              legal needs of our clients.
            </span>
          </p>
        </div>

        <div className="flex flex-col items-end justify-end w-full mt-3 mb-8 text-base"></div>

        <div className="mb-8">
          <React.Suspense fallback={<Skeleton height={500} width="100%" />}>
            <img
              src="../../assets/img/about-img.webp"
              alt="About Us"
              className="object-cover w-full h-[500px]"
            />
          </React.Suspense>
        </div>

        <div className="text-[32px] text-center text-black md:text-[36px] lg:text-[44px] md:px-8">
          <p>A law firm built on trust, expertise, and results.</p>
        </div>

        <TimelineSection />
      </div>
    </section>
  );
};

export default AboutUsIntro;
