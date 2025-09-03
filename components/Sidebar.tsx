import React from 'react';

const NavItem: React.FC<{icon: JSX.Element; label: string; active?: boolean}> = ({icon, label, active}) => {
    return (
        <a href="#" className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-colors duration-200 ${
            active ? 'bg-white/80 shadow-sm font-bold' : 'hover:bg-white/50'
        }`}>
            <div className={`flex-shrink-0 ${active ? 'text-gray-800' : 'text-gray-600'}`}>
                {icon}
            </div>
            <span className={` ${active ? 'text-gray-800' : 'text-gray-600'}`}>{label}</span>
        </a>
    )
}

const Sidebar: React.FC = () => {
    return (
        <aside className="w-80 bg-white/40 p-6 flex flex-col border-l border-white/50">
            <div className="w-12 h-12 rounded-full bg-[#e0f2ef] mb-12">
                {/* Placeholder Circle */}
            </div>
            <nav className="flex flex-col space-y-3">
                <NavItem icon={<DashboardIcon />} label="Dashboard" active />
                <NavItem icon={<BookOpenIcon />} label="Catatan Iqro" />
                <NavItem icon={<BookmarkIcon />} label="Hafalan Surat" />
                <NavItem icon={<ChartBarIcon />} label="Laporan" />
                <NavItem icon={<UserCircleIcon />} label="Profil" />
            </nav>
        </aside>
    );
};

// SVG Icons
const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
);
const BookOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>
);
const BookmarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
);
const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
);
const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0012 11z" clipRule="evenodd" /></svg>
);


export default Sidebar;