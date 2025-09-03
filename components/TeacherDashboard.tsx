
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { Student, ProgressReport } from '../types';
import IqroForm from './IqroForm';
import SurahForm from './SurahForm';
import ProgressCard from './ProgressCard';
import Card from './ui/Card';

const TeacherDashboard: React.FC = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [progress, setProgress] = useState<ProgressReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchStudents = useCallback(async () => {
        if (user) {
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

    const fetchProgress = useCallback(async () => {
        if (selectedStudent) {
            setIsLoading(true);
            try {
                const progressReports = await api.getProgressByStudent(selectedStudent.id);
                setProgress(progressReports);
            } catch (error) {
                console.error("Failed to fetch progress", error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [selectedStudent]);

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    useEffect(() => {
        if (selectedStudent) {
            fetchProgress();
        }
    }, [selectedStudent, fetchProgress]);

    const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const student = students.find(s => s.id === e.target.value);
        setSelectedStudent(student || null);
    };

    const handleReportAdded = (newReport: ProgressReport) => {
        setProgress(prev => [newReport, ...prev]);
    };

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <Card>
                    <h2 className="text-xl font-bold mb-4">Pilih Siswa</h2>
                    <select
                        onChange={handleStudentChange}
                        value={selectedStudent?.id || ''}
                        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                    >
                        {students.map(s => (
                            <option key={s.id} value={s.id}>{s.fullName} - Kelas {s.class}</option>
                        ))}
                    </select>
                </Card>
                {selectedStudent && user && (
                    <>
                        <IqroForm student={selectedStudent} teacherId={user.id} onReportAdded={handleReportAdded} />
                        <SurahForm student={selectedStudent} teacherId={user.id} onReportAdded={handleReportAdded} />
                    </>
                )}
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <h2 className="text-xl font-bold mb-4">Riwayat Laporan {selectedStudent?.fullName}</h2>
                    {isLoading ? (
                         <p className="text-gray-500">Memuat data...</p>
                    ) : (
                        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
                            {progress.length > 0 ? (
                                progress.map(p => <ProgressCard key={p.id} report={p} />)
                            ) : (
                                <p className="text-gray-500">Belum ada laporan untuk siswa ini.</p>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default TeacherDashboard;
