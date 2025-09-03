import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Student } from '../types';
import DailyInputView from './DailyInputView';
import StudentSummaryDashboard from './StudentSummaryDashboard';
import StudentManagement from './StudentManagement';

type Tab = 'daily' | 'summary' | 'manage';

const TeacherDashboard: React.FC = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>('summary');

    const fetchStudents = useCallback(async (showLoading = true) => {
        if (user) {
            if (showLoading) setIsLoading(true);
            try {
                const studentList = await api.getStudentsByTeacher(user.id);
                setStudents(studentList);
            } catch (error) {
                console.error("Failed to fetch students", error);
            } finally {
                if (showLoading) setIsLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-8 text-slate-500">Memuat data siswa...</div>;
        }

        switch (activeTab) {
            case 'daily':
                return <DailyInputView students={students} />;
            case 'summary':
                return <StudentSummaryDashboard students={students} teacherId={user!.id} />;
            case 'manage':
                return <StudentManagement students={students} teacherId={user!.id} onDataChange={() => fetchStudents(false)} />;
            default:
                return null;
        }
    };
    
    const TabButton: React.FC<{tabName: Tab, label: string, icon: JSX.Element}> = ({tabName, label, icon}) => (
         <button
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center space-x-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors duration-150 ${
                activeTab === tabName
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <TabButton tabName="summary" label="Ringkasan Siswa" icon={<HomeIcon />} />
                    <TabButton tabName="daily" label="Input Harian" icon={<PencilSquareIcon />} />
                    <TabButton tabName="manage" label="Kelola Siswa" icon={<UsersIcon />} />
                </nav>
            </div>
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

// Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);
const PencilSquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
  </svg>
);
const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0z" />
        <path fillRule="evenodd" d="M5.5 11a3.5 3.5 0 015.528-2.528 1 1 0 01.472.99V13a1 1 0 001 1h.5a1 1 0 001-1v-1.538a1 1 0 01.472-.882A3.5 3.5 0 0114.5 11H16a1 1 0 110 2h-1.5a3.5 3.5 0 01-6.472 2.118 1 1 0 01-.472-.882V13a1 1 0 00-1-1h-.5a1 1 0 00-1 1v1.538a1 1 0 01-.472.882A3.5 3.5 0 015.5 13H4a1 1 0 110-2h1.5z" clipRule="evenodd" />
    </svg>
);

export default TeacherDashboard;
