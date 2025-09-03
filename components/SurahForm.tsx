import React, { useState } from 'react';
// FIX: Import SurahProgress to be used for explicit typing of the report data.
import { Student, ReportType, ProgressReport, SurahProgress } from '../types';
import { api } from '../services/api';
import { JUZ_AMMA_SURAHS } from '../constants';
import Card from './ui/Card';
import Button from './ui/Button';

interface SurahFormProps {
    student: Student;
    teacherId: string;
    onReportAdded: (report: ProgressReport) => void;
}

const formInputStyle = "mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm";

const SurahForm: React.FC<SurahFormProps> = ({ student, teacherId, onReportAdded }) => {
    const [surahName, setSurahName] = useState(JUZ_AMMA_SURAHS[0]);
    const [startAyah, setStartAyah] = useState(1);
    const [endAyah, setEndAyah] = useState(1);
    const [grade, setGrade] = useState(80);
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');

        // FIX: Explicitly type `reportData` to ensure `type` is correctly inferred as `ReportType.HAFALAN`, matching the function signature for `api.addProgressReport`.
        const reportData: Omit<SurahProgress, 'id'> = {
            studentId: student.id,
            date: new Date(date).toISOString(),
            type: ReportType.HAFALAN,
            surahName,
            startAyah,
            endAyah,
            grade,
            notes,
            teacherId
        };
        
        try {
            const newReport = await api.addProgressReport(reportData);
            onReportAdded(newReport);
            setSuccessMessage('Laporan Hafalan berhasil disimpan!');
            // Reset form
            setSurahName(JUZ_AMMA_SURAHS[0]);
            setStartAyah(1);
            setEndAyah(1);
            setGrade(80);
            setNotes('');
            setDate(new Date().toISOString().split('T')[0]);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Failed to submit Surah report", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <h3 className="text-lg font-bold mb-4 text-slate-800">Catatan Harian Hafalan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-600">Tanggal</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className={formInputStyle} required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Surat</label>
                    <select value={surahName} onChange={e => setSurahName(e.target.value)} className={formInputStyle}>
                        {JUZ_AMMA_SURAHS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-600">Dari Ayat</label>
                        <input type="number" min="1" value={startAyah} onChange={e => setStartAyah(Number(e.target.value))} className={formInputStyle} />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-600">Sampai Ayat</label>
                        <input type="number" min={startAyah} value={endAyah} onChange={e => setEndAyah(Number(e.target.value))} className={formInputStyle} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Nilai: <span className="font-bold text-teal-600">{grade}</span></label>
                    <input type="range" min="0" max="100" value={grade} onChange={e => setGrade(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600">Catatan Guru</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className={formInputStyle} placeholder="Contoh: Hafalan sangat lancar..."></textarea>
                </div>
                <Button type="submit" isLoading={isLoading}>Simpan Laporan Hafalan</Button>
                {successMessage && <p className="text-green-600 text-sm mt-2 text-center">{successMessage}</p>}
            </form>
        </Card>
    );
};

export default SurahForm;