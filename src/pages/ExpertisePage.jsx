import { Suspense, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import ExpertiseCards from '../components/expertise/ExpertiseCards';

const ExpertiseSection = () => {
  // AOS library initialization on client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => AOS.init());
    }
  }, []);

  return (
    <section className="min-h-screen scroll-smooth">
      {/* Banner Section */}
      <header className="relative h-72 sm:h-96">
        <Suspense fallback={<Skeleton height="100%" width="100%" aria-busy="true" />}>
          <img
            src="/assets/img/expertise-banner.png"
            alt="Banner depicting legal expertise areas"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </Suspense>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-4xl sm:text-5xl font-bold text-white text-center"
            data-aos="fade-in"
          >
            OUR EXPERTISE
          </h1>
        </div>
      </header>

      {/* Title Section */}
      <div className="flex flex-col items-center justify-center py-12 max-w-[900px] mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center leading-snug">
          Comprehensive{' '}
          <Suspense fallback={<Skeleton width={80} height={40} aria-busy="true" />}>
            <img
              src="/assets/img/yel.webp"
              alt="Yellow icon representing service quality"
              className="inline-block mx-2 w-20"
              loading="lazy"
            />
          </Suspense>
          legal support <br />
          for national{' '}
          <Suspense fallback={<Skeleton width={80} height={40} aria-busy="true" />}>
            <img
              src="/assets/img/globe.webp"
              alt="Globe icon representing global reach"
              className="inline-block mx-2 w-20"
              loading="lazy"
            />
          </Suspense>
          & global businesses
        </h2>
      </div>

      {/* Expertise Cards Section with Skeleton Placeholder */}
      <div className="py-8">
        <Suspense fallback={<Skeleton count={3} height={300} className="my-4" aria-busy="true" />}>
          <ExpertiseCards />
        </Suspense>
      </div>
    </section>
  );
};

export default ExpertiseSection;
