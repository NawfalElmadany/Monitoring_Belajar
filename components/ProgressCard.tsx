
import React from 'react';
import { ProgressReport, ReportType } from '../types';

interface ProgressCardProps {
    report: ProgressReport;
    isReadOnly?: boolean;
}

const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600 bg-green-100';
    if (grade >= 75) return 'text-blue-600 bg-blue-100';
    if (grade >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
};

const ProgressCard: React.FC<ProgressCardProps> = ({ report, isReadOnly = false }) => {
    const reportDate = new Date(report.date).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const gradeColor = getGradeColor(report.grade);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-shadow hover:shadow-md">
            <div className="flex justify-between items-start">
                <div>
                    {report.type === ReportType.IQRO ? (
                        <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                            IQRO
                        </span>
                    ) : (
                         <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                            HAFALAN
                        </span>
                    )}
                    <p className="text-sm text-gray-500 mt-1">{reportDate}</p>
                </div>
                <div className={`text-2xl font-bold p-2 rounded-lg ${gradeColor}`}>
                    {report.grade}
                </div>
            </div>

            <div className="mt-4">
                {report.type === ReportType.IQRO ? (
                    <h4 className="text-lg font-semibold text-gray-800">Iqro Jilid {report.level}, Halaman {report.page}</h4>
                ) : (
                    <h4 className="text-lg font-semibold text-gray-800">Surat {report.surahName}, Ayat {report.startAyah}-{report.endAyah}</h4>
                )}
            </div>

            {report.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                        <span className="font-semibold">Catatan:</span> {report.notes}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProgressCard;
