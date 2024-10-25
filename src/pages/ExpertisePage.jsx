import ExpertiseCards from "../components/expertise/ExpertiseCards";

const ExpertiseSection = () => {
  return (
    <section className="min-h-screen">
      <div className="relative h-72 sm:h-96">
        <img
          src="/assets/img/expertise-banner.png"
          alt="Expertise Banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center" data-aos="fade-in">
            OUR EXPERTISE
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-12 max-w-[9p00px]">
        <h1 className="text-4xl md:text-6xl font-bold text-center leading-snug">
          Comprehensive <img src="/assets/img/yel.jpg" alt="icon" className="inline-block mx-2 w-20" /> 
          legal support 
          <br />
          for national 
          <img src="/assets/img/globe.jpg" alt="icon" className="inline-block mx-2 w-20" /> 
          &  global businesses
        </h1>
      </div>
      <ExpertiseCards />
    </section>
  );
};

export default ExpertiseSection;
