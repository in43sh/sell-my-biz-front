import { useState, useEffect } from 'react';
import { checkApiStatus } from '../api/DBRequests';
import Spinner from '../components/common/Spinner';
import GradientLayout from '../components/layouts/GradientLayout';

const ApiStatusCheck = () => {
  const [status, setStatus] = useState('Checking API...');
  const [statusColor, setStatusColor] = useState('text-gray-500');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApiStatus = async () => {
      try {
        const { status } = await checkApiStatus();
        if (status === 200) {
          setStatus('✅ API is working!');
          setStatusColor('text-green-600');
        } else {
          setStatus('⚠️ API responded but not OK.');
          setStatusColor('text-yellow-600');
        }
      } catch {
        setStatus('❌ API request failed.');
        setStatusColor('text-red-600');
      } finally {
        setLoading(false);
      }
    };

    fetchApiStatus();
  }, []);

  return (
    <GradientLayout>
      <div className="rounded-2xl border border-gray-200 bg-white px-8 py-6 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-semibold text-gray-800">
          API Status
        </h1>
        {loading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <Spinner />
          </div>
        ) : (
          <p className={`text-xl font-medium ${statusColor}`}>{status}</p>
        )}
      </div>
    </GradientLayout>
  );
};

export default ApiStatusCheck;
