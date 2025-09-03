
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import TeacherDashboard from './TeacherDashboard';
import ParentDashboard from './ParentDashboard';
import Header from './Header';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-slate-100">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8">
                {user?.role === UserRole.GURU && <TeacherDashboard />}
                {user?.role === UserRole.WALI_MURID && <ParentDashboard />}
            </main>
        </div>
    );
};

export default Dashboard;
