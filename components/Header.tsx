
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
    const { user } = useAuth();

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                         <h1 className="text-2xl font-bold text-teal-600">Catatan Mengaji</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden md:block">
                            <span className="text-gray-600 mr-4">Halo, {user?.fullName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;