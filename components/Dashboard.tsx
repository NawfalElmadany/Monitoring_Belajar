
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import TeacherDashboard from './TeacherDashboard';
import ParentDashboard from './ParentDashboard';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="flex h-[850px] max-h-[90vh]">
            <main className="flex-1 p-12 overflow-y-auto">
                {user?.role === UserRole.GURU && <TeacherDashboard />}
                {user?.role === UserRole.WALI_MURID && <ParentDashboard />}
            </main>
            <Sidebar />
        </div>
    );
};

export default Dashboard;