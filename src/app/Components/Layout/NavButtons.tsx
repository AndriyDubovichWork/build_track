// components/NavButtons.tsx

import { TabType } from '@/app/types';

interface NavButtonsProps {
  id: string;
  activeTab: TabType;
}

export const NavButtons = ({ id, activeTab }: NavButtonsProps) => {
  const tabs = [
    { name: 'Main', path: '/', tab: 'main' as const },
    { name: 'Tasks', path: '/tasks', tab: 'tasks' as const },
    { name: 'Materials', path: '/materials', tab: 'materials' as const },
  ];

  return (
    <div className='flex space-x-4 mb-8'>
      {tabs.map((tab) => (
        <a
          key={tab.name}
          href={`${tab.path}?id=${id}`}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === tab.tab
              ? 'bg-green-600 text-white'
              : 'bg-blue-500 text-white hover:bg-green-600'
          }`}
        >
          {tab.name}
        </a>
      ))}
    </div>
  );
};
