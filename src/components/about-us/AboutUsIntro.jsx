import AboutImage from "../../assets/img/about-img.jpg";
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
        <div className="flex flex-col items-end justify-end w-full mt-3 mb-8 text-base">
          {/* <p className="md:max-w-[510px] md:text-right md:mr-10 leading-[27px] text-xl leading-relaxed text-gray-600">
            At PUC, we are dedicated to providing comprehensive legal
            services tailored to meet the unique needs of our clients. Our team
            of experienced attorneys is committed to navigating complex legal
            landscapes, ensuring you receive the support and guidance you
            deserve.
          </p> */}
        </div>
        <div className="mb-8">
          <img
            src={AboutImage}
            alt="About Us"
            className="object-cover w-full h-[500px]"
          />
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
