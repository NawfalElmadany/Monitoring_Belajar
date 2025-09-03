import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { Student, ProgressReport } from '../types';
import TartiliForm from './IqroForm';
import SurahForm from './SurahForm';
import ProgressCard from './ProgressCard';
import Card from './ui/Card';
import { useAuth } from '../hooks/useAuth';

interface DailyInputViewProps {
    students: Student[];
}

const DailyInputView: React.FC<DailyInputViewProps> = ({ students }) => {
    const { user } = useAuth();
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [progress, setProgress] = useState<ProgressReport[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (students.length > 0 && !selectedStudent) {
            setSelectedStudent(students[0]);
        }
    }, [students, selectedStudent]);

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
        fetchProgress();
    }, [fetchProgress]);

    const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const student = students.find(s => s.id === e.target.value);
        setSelectedStudent(student || null);
    };

    const handleReportAdded = (newReport: ProgressReport) => {
        if (newReport.studentId === selectedStudent?.id) {
            setProgress(prev => [newReport, ...prev]);
        }
    };
    
    if (students.length === 0) {
        return (
            <Card className="text-center">
                <p className="text-slate-500">Anda belum memiliki siswa. Silakan tambahkan siswa di tab 'Kelola Siswa'.</p>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                <Card>
                    <h2 className="text-xl font-bold mb-4 text-slate-800">Pilih Siswa</h2>
                    <select
                        onChange={handleStudentChange}
                        value={selectedStudent?.id || ''}
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    >
                        {students.map(s => (
                            <option key={s.id} value={s.id}>{s.fullName} - Kelas {s.class}</option>
                        ))}
                    </select>
                </Card>
                {selectedStudent && user && (
                    <>
                        <TartiliForm student={selectedStudent} teacherId={user.id} onReportAdded={handleReportAdded} />
                        <SurahForm student={selectedStudent} teacherId={user.id} onReportAdded={handleReportAdded} />
                    </>
                )}
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <h2 className="text-xl font-bold mb-4 text-slate-800">Riwayat Laporan {selectedStudent?.fullName}</h2>
                    {isLoading ? (
                         <p className="text-slate-500">Memuat data...</p>
                    ) : (
                        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 -mr-2">
                            {progress.length > 0 ? (
                                progress.map(p => <ProgressCard key={p.id} report={p} />)
                            ) : (
                                <p className="text-slate-500">Belum ada laporan untuk siswa ini.</p>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default DailyInputView;