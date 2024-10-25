import { Disclosure } from '@headlessui/react';
import { useState } from 'react';
import expertiseData from '../../../data';
import OtherPracticeAreas from '../../components/practice-areas/OtherPracticeAreas';

const { title, description, practicalExperience } = expertiseData.energyEnvironment;

const EnergyEnvPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleDisclosureToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>

      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
        {/* Banner for the Title Section */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-[#01553d] h-32 rounded-lg" />
          <h1 className="text-4xl font-bold text-white relative z-10 text-center pt-10">{title}</h1>
        </div>

        <div className="py-8 space-y-4">
          {description.map((para, index) => (
            <p key={index} className="text-xl text-gray-600 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Banner for Practical Experience Section */}
        <div className="relative my-12">
          <div className="absolute inset-0 bg-[#01553d] h-24 rounded-lg" />
          <h2 className="text-3xl font-semibold text-white relative z-10 text-center pt-6">Practical Experience</h2>
        </div>

        <div className="space-y-4">
          {practicalExperience.map((experience, index) => (
            <Disclosure key={index} as="div" className="border-b border-gray-300">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    onClick={() => handleDisclosureToggle(index)}
                    className="flex justify-between w-full p-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-lg focus:outline-none"
                  >
                    <h3 className="text-xl font-semibold text-secondary">{experience.experienceTitle}</h3>
                    <span className={`${open || openIndex === index ? 'transform rotate-180' : ''} transition-transform duration-200`}>
                      ▼
                    </span>
                  </Disclosure.Button>
                  {(open || openIndex === index) && (
                    <Disclosure.Panel className="p-4 text-lg text-gray-600">
                      {experience.experienceDesc}
                    </Disclosure.Panel>
                  )}
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
      <OtherPracticeAreas currentTitle="Energy and Environmental Law" />
    </>
  );
};

export default EnergyEnvPage;
