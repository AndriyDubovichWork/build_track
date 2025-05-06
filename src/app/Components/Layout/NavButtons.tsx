// components/NavButtons.tsx

import { TabType } from '@/app/types';

interface NavButtonsProps {
  activeTab: TabType;
}

export const NavButtons = ({ activeTab }: NavButtonsProps) => {
  const tabs = [
    { name: 'Main', path: '/', tab: 'main' as const },
    { name: 'Companies', path: '/companies', tab: 'companies' as const },
    { name: 'Tasks', path: '/tasks', tab: 'tasks' as const },
    { name: 'Materials', path: '/materials', tab: 'materials' as const },
  ];

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
