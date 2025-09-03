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

const SurahForm: React.FC<SurahFormProps> = ({ student, teacherId, onReportAdded }) => {
    const [surahName, setSurahName] = useState(JUZ_AMMA_SURAHS[0]);
    const [startAyah, setStartAyah] = useState(1);
    const [endAyah, setEndAyah] = useState(1);
    const [grade, setGrade] = useState(80);
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');

        // FIX: Explicitly type `reportData` to ensure `type` is correctly inferred as `ReportType.HAFALAN`, matching the function signature for `api.addProgressReport`.
        const reportData: Omit<SurahProgress, 'id' | 'date'> = {
            studentId: student.id,
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
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Failed to submit Surah report", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <h3 className="text-lg font-bold mb-4">Catatan Harian Hafalan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Surat</label>
                    <select value={surahName} onChange={e => setSurahName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                        {JUZ_AMMA_SURAHS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Dari Ayat</label>
                        <input type="number" min="1" value={startAyah} onChange={e => setStartAyah(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Sampai Ayat</label>
                        <input type="number" min={startAyah} value={endAyah} onChange={e => setEndAyah(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium">Nilai: {grade}</label>
                    <input type="range" min="0" max="100" value={grade} onChange={e => setGrade(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Catatan Guru</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                </div>
                <Button type="submit" isLoading={isLoading}>Simpan Laporan Hafalan</Button>
                {successMessage && <p className="text-green-600 text-sm mt-2">{successMessage}</p>}
            </form>
        </Card>
    );
};

export default SurahForm;