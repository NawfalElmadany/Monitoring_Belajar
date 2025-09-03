import React, { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { Student, ProgressReport, StudentProgressSummary, ReportType } from '../types';
import Card from './ui/Card';

interface StudentSummaryDashboardProps {
    students: Student[];
    teacherId: string;
}

const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'bg-green-500';
    if (grade >= 75) return 'bg-sky-500';
    if (grade >= 60) return 'bg-amber-500';
    return 'bg-red-500';
};


const StudentSummaryCard: React.FC<{ summary: StudentProgressSummary }> = ({ summary }) => {
    const { student, latestReport } = summary;

    const renderLatestProgress = () => {
        if (!latestReport) {
            return <p className="text-sm text-slate-500">Belum ada laporan</p>;
        }
        if (latestReport.type === ReportType.TARTILI) {
            return <p className="font-semibold text-slate-700">Tartili {latestReport.level}, Hal {latestReport.page}</p>;
        }
        return <p className="font-semibold text-slate-700">{latestReport.surahName} {latestReport.startAyah}-{latestReport.endAyah}</p>;
    }
    
    const reportDate = latestReport ? new Date(latestReport.date).toLocaleDateString('id-ID', {
        month: 'short', day: 'numeric'
    }) : '-';

    return (
        <Card className="flex flex-col justify-between hover:border-teal-400 transition-colors">
            <div>
                <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2">
                        <h3 className="font-bold text-lg text-slate-800 truncate">{student.fullName}</h3>
                        <p className="text-sm text-slate-500">Kelas {student.class}</p>
                    </div>
                    {latestReport && (
                         <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full text-white text-lg font-bold ${getGradeColor(latestReport.grade)}`}>
                            {latestReport.grade}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200/80">
                <p className="text-xs text-slate-400 mb-1">Pencapaian Terakhir ({reportDate})</p>
                {renderLatestProgress()}
            </div>
        </Card>
    );
};


const StudentSummaryDashboard: React.FC<StudentSummaryDashboardProps> = ({ students, teacherId }) => {
    const [allProgress, setAllProgress] = useState<ProgressReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllProgress = async () => {
            setIsLoading(true);
            try {
                const progress = await api.getAllProgressByTeacher(teacherId);
                setAllProgress(progress);
            } catch (error) {
                console.error("Failed to fetch all progress", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllProgress();
    }, [teacherId]);

    const summaryData = useMemo<StudentProgressSummary[]>(() => {
        return students.map(student => {
            const studentProgress = allProgress
                .filter(p => p.studentId === student.id)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return {
                student,
                latestReport: studentProgress.length > 0 ? studentProgress[0] : null,
            };
        });
    }, [students, allProgress]);

    if (isLoading) {
        return <p className="text-center text-slate-500">Memuat ringkasan siswa...</p>;
    }
    
    if (students.length === 0) {
        return (
            <Card className="text-center">
                <p className="text-slate-500">Anda belum memiliki siswa. Silakan tambahkan siswa di tab 'Kelola Siswa'.</p>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {summaryData.map(summary => (
                <StudentSummaryCard key={summary.student.id} summary={summary} />
            ))}
        </div>
    );
};

export default StudentSummaryDashboard;