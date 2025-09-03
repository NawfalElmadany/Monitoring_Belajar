import React, { useState } from 'react';
// FIX: Import TartiliProgress to be used for explicit typing of the report data.
import { Student, ReportType, ProgressReport, TartiliProgress } from '../types';
import { api } from '../services/api';
import Card from './ui/Card';
import Button from './ui/Button';

interface TartiliFormProps {
    student: Student;
    teacherId: string;
    onReportAdded: (report: ProgressReport) => void;
}

const formInputStyle = "mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm";

const TartiliForm: React.FC<TartiliFormProps> = ({ student, teacherId, onReportAdded }) => {
    const [level, setLevel] = useState(1);
    const [page, setPage] = useState(1);
    const [grade, setGrade] = useState(80);
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');

        // FIX: Explicitly type `reportData` to ensure `type` is correctly inferred as `ReportType.TARTILI`, matching the function signature for `api.addProgressReport`.
        const reportData: Omit<TartiliProgress, 'id'> = {
            studentId: student.id,
            date: new Date(date).toISOString(),
            type: ReportType.TARTILI,
            level,
            page,
            grade,
            notes,
            teacherId,
        };
        
        try {
            const newReport = await api.addProgressReport(reportData);
            onReportAdded(newReport);
            setSuccessMessage('Laporan Tartili berhasil disimpan!');
            // Reset form
            setLevel(1);
            setPage(1);
            setGrade(80);
            setNotes('');
            setDate(new Date().toISOString().split('T')[0]);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Failed to submit Tartili report", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Card>
            <h3 className="text-lg font-bold mb-4 text-slate-800">Catatan Harian Tartili</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-600">Tanggal</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className={formInputStyle} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Tartili Jilid</label>
                    <select value={level} onChange={e => setLevel(Number(e.target.value))} className={formInputStyle}>
                        {[1, 2, 3, 4, 5, 6].map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Halaman</label>
                    <select value={page} onChange={e => setPage(Number(e.target.value))} className={formInputStyle}>
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Nilai: <span className="font-bold text-teal-600">{grade}</span></label>
                    <input type="range" min="0" max="100" value={grade} onChange={e => setGrade(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Catatan Guru</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className={formInputStyle} placeholder="Contoh: Makhraj huruf sudah lebih baik..."></textarea>
                </div>
                <Button type="submit" isLoading={isLoading}>Simpan Laporan Tartili</Button>
                {successMessage && <p className="text-green-600 text-sm mt-2 text-center">{successMessage}</p>}
            </form>
        </Card>
    );
};

export default TartiliForm;