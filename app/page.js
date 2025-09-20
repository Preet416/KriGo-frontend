// app/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import PaymentWrapper from '../components/Home/PaymentWrapper';

export default function Landing() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      const role = localStorage.getItem('loginRole');
      if (role === 'driver') router.replace('/driver-dashboard');
      else if (role === 'rider') router.replace('/ride');
    }
  }, [isSignedIn, router]);

  function saveRole(role) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('loginRole', role);
    }
  }

  const features = [
    { title: 'Book a Ride Fast', description: 'Get from pickup to dropoff in minutes.' },
    { title: 'Drive and Earn', description: 'Join as a driver and start earning today.' },
    { title: 'Safe & Reliable', description: 'Trusted rides with professional drivers.' },
    { title: 'Real-time Tracking', description: 'Track your ride in real-time from start to finish.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[100vh] bg-gradient-to-br from-blue-50 to-blue-100 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-[60rem] h-[60rem] bg-blue-200 rounded-full opacity-20 z-0"></div>
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-indigo-200 rounded-full opacity-20 z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-gray-800">
            Welcome to KriGO
          </h1>
          <p className="text-2xl md:text-3xl mb-6 text-gray-700">
            Fast, safe, and reliable rides whenever you need them.
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-600">
            Join thousands of happy riders and drivers. Experience convenience like never before.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/sign-in"
              onClick={() => saveRole('rider')}
              className="px-6 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition shadow-lg"
            >
              Login as Rider
            </Link>
            <Link
              href="/sign-in"
              onClick={() => saveRole('driver')}
              className="px-6 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
            >
              Login as Driver
            </Link>
            <Link
              href="/ride"
              className="px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              Continue to App
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-700">
            <span className="bg-white px-4 py-2 rounded-full shadow-md text-sm md:text-base">
              24/7 Availability
            </span>
            <span className="bg-white px-4 py-2 rounded-full shadow-md text-sm md:text-base">
              Affordable Prices
            </span>
            <span className="bg-white px-4 py-2 rounded-full shadow-md text-sm md:text-base">
              Trusted Drivers
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-gray-800">
          Why Choose KriGO?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition text-center"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo PaymentWrapper */}
      <div className="max-w-md mx-auto my-12">
        <PaymentWrapper
          amount={200}
          pickup="123 Main Street, Mumbai"
          dropoff="456 Park Avenue, Mumbai"
          carType="Mini"
        />
      </div>
    </div>
  );
}
