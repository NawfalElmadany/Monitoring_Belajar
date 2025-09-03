import React, { useState } from 'react';
import { Student, ReportType, TartiliProgress } from '../types';
import { api } from '../services/api';
import Button from './ui/Button';

interface MonitoringFormProps {
    student: Student;
    teacherId: string;
    onReportAdded: () => void;
}

const formLabelStyle = "block text-sm font-medium text-gray-600 mb-1";
const formSelectStyle = "w-full bg-white/80 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500";
const formTextareaStyle = "w-full bg-white/80 border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500";
const formRangeStyle = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#6AD0B9]";

const MonitoringForm: React.FC<MonitoringFormProps> = ({ student, teacherId, onReportAdded }) => {
    const [level, setLevel] = useState(2);
    const [page, setPage] = useState(10);
    const [grade, setGrade] = useState(80);
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');

        const reportData: Omit<TartiliProgress, 'id'> = {
            studentId: student.id,
            date: new Date().toISOString(),
            type: ReportType.TARTILI,
            level,
            page,
            grade,
            notes,
            teacherId,
        };
        
        try {
            await api.addProgressReport(reportData);
            onReportAdded();
            setSuccessMessage('Laporan berhasil disimpan!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Failed to submit report", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="bg-white/70 rounded-2xl shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{student.fullName}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={formLabelStyle}>Iqro</label>
                        <select value={level} onChange={e => setLevel(Number(e.target.value))} className={formSelectStyle}>
                            {[1, 2, 3, 4, 5, 6].map(i => <option key={i} value={i}>Iqro {i}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className={formLabelStyle}>&nbsp;</label>
                        <select value={page} onChange={e => setPage(Number(e.target.value))} className={formSelectStyle}>
                            {Array.from({ length: 40 }, (_, i) => i + 1).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={formLabelStyle}>Nilai</label>
                        <input type="range" min="0" max="100" value={grade} onChange={e => setGrade(Number(e.target.value))} className={formRangeStyle} />
                    </div>
                    <div>
                         <label className={formLabelStyle}>Nilai</label>
                         <input type="range" min="0" max="100" value={75} disabled className={`${formRangeStyle} opacity-50`} />
                    </div>
                </div>

                <div>
                    <label className={formLabelStyle}>Catatan Guru</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className={formTextareaStyle} placeholder="Catatan Guru"></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  isLoading={isLoading} 
                  className="w-full !bg-[#6AD0B9] hover:!bg-[#59b8a3] !text-gray-800 !font-bold !py-3 !text-base !rounded-xl"
                >
                  SIMPAN
                </Button>
                {successMessage && <p className="text-green-700 text-sm mt-2 text-center">{successMessage}</p>}
            </form>
        </div>
    );
};

export default MonitoringForm;