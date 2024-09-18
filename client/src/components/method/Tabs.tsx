import React from 'react';

interface TabsProps {
  tabs: string[];
  onTabClick: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, onTabClick }) => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    onTabClick(index);
  };

  return (
    <nav className=" mx-auto border-y-2  ">
      <ul className=" grid grid-cols-4 divide-x  ">
        {tabs.map((tab, index) => (
          <li key={index}>
            <button
              className={`py-2 px-4 w-full  focus:outline-none font-bold ${
                activeTab === index ? 'bg-gradient-to-b  from-[#0092FF] from-50% to-[#00B9F4]/40 text-white' : ' text-slate-800'
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
