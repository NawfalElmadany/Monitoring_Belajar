import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Student } from '../types';
import Button from './ui/Button';

interface StudentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    student: Student | null;
    teacherId: string;
}

const formInputStyle = "mt-1 block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm";


const StudentFormModal: React.FC<StudentFormModalProps> = ({ isOpen, onClose, onSave, student, teacherId }) => {
    const [fullName, setFullName] = useState('');
    const [className, setClassName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (student) {
            setFullName(student.fullName);
            setClassName(student.class);
        } else {
            setFullName('');
            setClassName('');
        }
        setError('');
    }, [student, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !className.trim()) {
            setError("Nama lengkap dan kelas tidak boleh kosong.");
            return;
        }
        setIsLoading(true);
        setError('');

        try {
            if (student) {
                // Update student
                await api.updateStudent(student.id, { fullName, class: className });
            } else {
                // Add new student
                await api.addStudent({ fullName, class: className, teacherId, parentId: `p${Date.now()}` }); // Mock parentId
            }
            onSave();
        } catch (err) {
            setError("Gagal menyimpan data siswa.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md modal-animate">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-xl font-bold text-slate-800">{student ? 'Edit Siswa' : 'Tambah Siswa Baru'}</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                         <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-slate-600">Nama Lengkap</label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className={formInputStyle}
                            />
                        </div>
                         <div>
                            <label htmlFor="className" className="block text-sm font-medium text-slate-600">Kelas</label>
                            <input
                                id="className"
                                type="text"
                                value={className}
                                onChange={(e) => setClassName(e.target.value)}
                                required
                                className={formInputStyle}
                                placeholder="Contoh: A, B, TPA Pagi"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                    <div className="px-6 py-4 bg-slate-50 flex justify-end space-x-3 rounded-b-xl">
                         <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors">
                            Batal
                        </button>
                        <Button type="submit" isLoading={isLoading} className="w-auto">
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentFormModal;