import React from 'react';
import { ProgressReport, ReportType } from '../types';

interface ProgressCardProps {
    report: ProgressReport;
    isReadOnly?: boolean;
}

const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-800 bg-green-100';
    if (grade >= 75) return 'text-sky-800 bg-sky-100';
    if (grade >= 60) return 'text-amber-800 bg-amber-100';
    return 'text-red-800 bg-red-100';
};

const ProgressCard: React.FC<ProgressCardProps> = ({ report, isReadOnly = false }) => {
    const reportDate = new Date(report.date).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const gradeColor = getGradeColor(report.grade);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 transition-shadow hover:shadow-md">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        {report.type === ReportType.TARTILI ? (
                            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                                TARTILI
                            </span>
                        ) : (
                             <span className="inline-block bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                                HAFALAN
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 mt-2">{reportDate}</p>
                </div>
                <div className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-lg ${gradeColor}`}>
                    <span className="text-3xl font-bold">{report.grade}</span>
                </div>
            </div>

            <div className="mt-4">
                {report.type === ReportType.TARTILI ? (
                    <h4 className="text-lg font-semibold text-slate-800">Tartili Jilid {report.level}, Halaman {report.page}</h4>
                ) : (
                    <h4 className="text-lg font-semibold text-slate-800">Surat {report.surahName}, Ayat {report.startAyah}-{report.endAyah}</h4>
                )}
            </div>

            {report.notes && (
                <div className="mt-4 pt-4 border-t border-slate-200/80">
                     <blockquote className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-sm text-slate-600 italic">"{report.notes}"</p>
                    </blockquote>
                </div>
            )}
        </div>
    );
};

export default ProgressCard;