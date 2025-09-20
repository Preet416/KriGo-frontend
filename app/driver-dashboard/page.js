'use client';
import { useState, useEffect } from 'react';
import {
  HomeIcon,
  MapIcon,
  ClockIcon,
  UserIcon,
  StarIcon,
} from '@heroicons/react/24/outline';


const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);

 
  const driverId = '123';

  useEffect(() => {
    
    fetch(`${BACKEND_URL}/api/rides/live-requests`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `Failed to fetch live requests: ${res.status} ${text}`
          );
        }
        return res.json();
      })
      .then((data) => setRequests(data))
      .catch((err) => console.error('Error fetching live requests:', err));

    
    fetch(`${BACKEND_URL}/api/rides/history/${driverId}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch ride history: ${res.status} ${text}`);
        }
        return res.json();
      })
      .then((data) => setHistory(data))
      .catch((err) => console.error('Error fetching ride history:', err));
  }, [driverId]);

  const tabs = [
    { name: 'Home', icon: HomeIcon, key: 'home' },
    { name: 'Live Requests', icon: MapIcon, key: 'live' },
    { name: 'Ride History', icon: ClockIcon, key: 'history' },
    { name: 'Profile', icon: UserIcon, key: 'profile' },
    { name: 'Rating', icon: StarIcon, key: 'rating' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Welcome back!</h2>
            <p>Here is a quick overview of your dashboard.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg shadow">
                Total Live Requests: {requests.length}
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow">
                Completed Rides: {history.length}
              </div>
            </div>
          </div>
        );
      case 'live':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Incoming Ride Requests
            </h2>
            {requests.length === 0 ? (
              <p>No current requests.</p>
            ) : (
              <ul className="space-y-2">
                {requests.map((req) => (
                  <li
                    key={req.id}
                    className="border p-3 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <span className="font-medium">Pickup:</span> {req.pickup} →{' '}
                    <span className="font-medium">Drop:</span> {req.drop}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'history':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Ride History</h2>
            {history.length === 0 ? (
              <p>No past rides.</p>
            ) : (
              <ul className="space-y-2">
                {history.map((ride) => (
                  <li
                    key={ride.id}
                    className="border p-3 rounded-lg shadow-sm hover:shadow-md transition"
                  >
                    <span className="font-medium">{ride.date}</span> —{' '}
                    {ride.pickup} → {ride.drop}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'profile':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p>Edit your profile information here.</p>
          </div>
        );
      case 'rating':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Rating</h2>
            <p>Check your ratings and reviews from riders.</p>
          </div>
        );
      default:
        return <div>Select a tab.</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">KriGO Dashboard</div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center w-full px-4 py-3 rounded-lg font-medium hover:bg-blue-50 transition ${
                activeTab === tab.key
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-3" />
              {tab.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
