import { useState, useEffect } from 'react';
import { checkApiStatus } from '../api/DBRequests';

export default function ApiStatusCheck() {
  const [status, setStatus] = useState('Checking...');
  const [statusColor, setStatusColor] = useState('text-gray-700');

  useEffect(() => {
    checkApiStatus()
      .then((response) => {
        if (response.ok) {
          setStatus('API is working!');
          setStatusColor('text-green-600');
        } else {
          setStatus('API responded but not OK.');
          setStatusColor('text-red-600');
        }
      })
      .catch((error) => {
        setStatus('API request failed.');
        setStatusColor('text-red-600');
        console.error('Error fetching API status:', error);
      });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="rounded-xl border border-gray-300 bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-2xl font-bold">API Status</h1>
        <p className={`mt-2 text-lg font-medium ${statusColor}`}>{status}</p>
      </div>
    </div>
  );
}
