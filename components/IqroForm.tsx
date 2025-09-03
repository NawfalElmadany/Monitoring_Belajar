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

const TartiliForm: React.FC<TartiliFormProps> = ({ student, teacherId, onReportAdded }) => {
    const [level, setLevel] = useState(1);
    const [page, setPage] = useState(1);
    const [grade, setGrade] = useState(80);
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');

        // FIX: Explicitly type `reportData` to ensure `type` is correctly inferred as `ReportType.TARTILI`, matching the function signature for `api.addProgressReport`.
        const reportData: Omit<TartiliProgress, 'id' | 'date'> = {
            studentId: student.id,
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
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Failed to submit Tartili report", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <Card>
            <h3 className="text-lg font-bold mb-4">Catatan Harian Tartili</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Tartili Jilid</label>
                    <select value={level} onChange={e => setLevel(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        {[1, 2, 3, 4, 5, 6].map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Halaman</label>
                    <select value={page} onChange={e => setPage(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Nilai: {grade}</label>
                    <input type="range" min="0" max="100" value={grade} onChange={e => setGrade(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Catatan Guru</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <Button type="submit" isLoading={isLoading}>Simpan Laporan Tartili</Button>
                {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
            </form>
        </Card>
    );
};

export default TartiliForm;