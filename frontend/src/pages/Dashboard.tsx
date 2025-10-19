import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { VerifiedUserList } from '@/components/VerifiedUserList';
import { ProtobufUserList } from '@/components/ProtobufUserList';
import { UserCreationChart } from '@/components/UserCreationChart';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('verified');

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'verified' && <VerifiedUserList />}
          {activeTab === 'protobuf' && <ProtobufUserList />}
          {activeTab === 'analytics' && <UserCreationChart />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
