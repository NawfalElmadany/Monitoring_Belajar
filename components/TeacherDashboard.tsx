import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Student } from '../types';
import MonitoringForm from './MonitoringForm';

const TeacherDashboard: React.FC = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const fetchStudents = useCallback(async () => {
        if (user) {
            setIsLoading(true);
            try {
                const studentList = await api.getStudentsByTeacher(user.id);
                setStudents(studentList);
                if (studentList.length > 0) {
                    setSelectedStudent(studentList[0]);
                }
            } catch (error) {
                console.error("Failed to fetch students", error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    const handleReportAdded = () => {
      // Maybe show a success message or refresh data
      console.log('Report added!');
    };

    if (isLoading) {
        return <div className="text-center p-8 text-slate-500">Memuat data siswa...</div>;
    }

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800">MONITORING MENGAJI</h1>
            
            {students.length > 0 && selectedStudent && user ? (
                 <MonitoringForm 
                    key={selectedStudent.id} 
                    student={selectedStudent} 
                    teacherId={user.id} 
                    onReportAdded={handleReportAdded} 
                 />
            ) : (
                <div className="bg-white/80 rounded-xl p-6 text-center">
                    <p className="text-slate-500">Anda belum memiliki siswa. Silakan tambahkan siswa.</p>
                </div>
            )}
        </div>
    );
};

export default TeacherDashboard;