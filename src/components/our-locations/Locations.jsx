/* eslint-disable react/prop-types */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const locations = {
  CA: [
    {
      name: 'Lagos, Nigeria',
      address: 'Victoria Island',
      imageUrl: '/assets/img/Lagos.jpg',
    },
    {
      name: 'Abuja, Nigeria',
      address: 'Central Business District, Abuja',
      imageUrl: '/assets/img/abj.jpg',
    },
    {
      name: 'Uyo, Nigeria',
      address: '380 Albion Road Etobicoke, Toronto, ON',
      imageUrl: '/assets/img/Lagos.jpg',
    },
  ],
};

const LocationCard = ({ name, address, imageUrl}) => (
  <a className="block bg-white rounded-lg shadow-lg overflow-hidden">
    <React.Suspense fallback={<Skeleton height={300} width={500} />}>
      <img src={imageUrl} alt={`Location at ${name}`} width={500} height={300} className="object-cover h-48" />
    </React.Suspense>
    <div className="p-4">
      <h3 className="text-xl sm:text-2xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 text-sm sm:text-base mb-4">{address}</p>
    </div>
  </a>
);

const Locations = () => (
  <div className="px-4 mt-[-80px]">
    <h2 className="text-4xl md:text-5xl font-bold text-left md:text-center mb-8 text-[#01553d]">Our Locations</h2>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {locations.CA.map((location, index) => (
        <LocationCard key={index} {...location} />
      ))}
    </div>
  </div>
);

export default Locations;
