// components/NavButtons.tsx

import companyById from '@/app/APIRequests/companyById';
import { TabType } from '@/app/types';
import { useEffect, useState } from 'react';

interface NavButtonsProps {
  activeTab: TabType;
  companyId?: string;
}

export const NavButtons = ({ activeTab, companyId }: NavButtonsProps) => {
  const [tabs, setTabs] = useState([
    { name: 'Main', path: '/', tab: 'main' },
    { name: 'Companies', path: '/companies', tab: 'companies' },
    // { name: 'Tasks', path: '/tasks', tab: 'tasks' as const },
    // { name: 'Materials', path: '/materials', tab: 'materials' as const },
  ]);
  useEffect(() => {
    if (companyId) {
      companyById(companyId).then(({ data }) =>
        setTabs((prevTabs) => [
          ...prevTabs,
          {
            name: data.name + ' rooms',
            path: `/rooms?companyId=${data.id}`,
            tab: 'room',
          },
        ])
      );
    }
  }, [companyId]);
  return (
    <div className='flex space-x-4 mb-8'>
      {tabs.map((tab) => (
        <a
          key={tab.name}
          href={`${tab.path}`}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === tab.tab
              ? 'bg-orange-600 text-white hover:bg-orange-800'
              : 'bg-orange-400 text-white hover:bg-orange-500'
          }`}
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
};
