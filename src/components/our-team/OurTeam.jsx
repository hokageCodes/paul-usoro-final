export default function OurTeam() {
  return (
    <section className="py-24 bg-[#01553d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center flex-col lg:flex-row md:mt-20 gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-5xl text-white font-bold leading-[4rem] mb-2 text-left">
              Our leading, strong & goal-oriented team
            </h2>
            <p className="text-xl text-white mb-8 text-left">
              These people work on making our product best. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, voluptate?.
            </p>
            <a
              href="/careers"
              className="text-xl cursor-pointer py-5 px-8 w-60 border text-white text-base font-semibold transition-all duration-500 block text-center rounded-full hover:bg-white hover:text-[#01553d] lg:mx-0"
            >
              Join our team
            </a>
          </div>
          <div className="w-full lg:w-2/2 lg:mt-0 md:mt-40 mt-16 max-w-4xl">
            <div className="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 gap-12">
              <img
                src="/assets/img/PP.webp"
                alt="Team member 1"
                className="w-80 h-72 rounded-2xl object-cover object-top md:mt-20 mx-auto min-[450px]:mr-0"
              />
              <img
                src="/assets/img/MP.webp"
                alt="Team member 2"
                className="w-80 h-72 rounded-2xl object-cover object-top mx-auto min-[450px]:ml-0 md:mx-auto"
              />
              <img
                src="/assets/img/Alj.webp"
                alt="Team member 3"
                className="w-80 h-72 rounded-2xl object-cover object-top md:mt-20 mx-auto min-[450px]:mr-0 md:ml-0"
              />
              <img
                src="/assets/img/kabi.webp"
                alt="Team member 4"
                className="w-80 h-72 rounded-2xl object-cover object-top mx-auto min-[450px]:ml-0 md:mr-0 md:ml-auto"
              />
              <img
                src="/assets/img/chi.webp"
                alt="Team member 5"
                className="w-80 h-72 rounded-2xl object-cover object-top md:-mt-20 mx-auto min-[450px]:mr-0 md:mx-auto"
              />
              {/* Uncomment if needed */}
              {/* <img
                src="/assets/img/chi.webp"
                alt="Team member 6"
                className="w-80 h-72 rounded-2xl object-cover object-top mx-auto min-[450px]:ml-0 md:mr-0"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
