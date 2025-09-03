import React from 'react';
import { useAuth } from '../hooks/useAuth';

const getInitials = (name: string = '') => {
    return name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('');
};

const Header: React.FC = () => {
    const { user } = useAuth();
    const initials = getInitials(user?.fullName);

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                         <h1 className="text-2xl font-bold text-teal-600">Catatan Mengaji</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <span className="font-semibold text-slate-700">{user?.fullName}</span>
                            <span className="text-sm text-slate-500 block capitalize">{user?.role.replace('_', ' ')}</span>
                        </div>
                         <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white font-bold text-sm">
                            {initials}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;