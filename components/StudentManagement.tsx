import React, { useState, useMemo } from 'react';
import { api } from '../services/api';
import { Student } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import StudentFormModal from './StudentFormModal';

interface StudentManagementProps {
    students: Student[];
    teacherId: string;
    onDataChange: () => void;
}

const StudentManagement: React.FC<StudentManagementProps> = ({ students, teacherId, onDataChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

    const handleAddStudent = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleEditStudent = (student: Student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };
    
    const handleDeleteStudent = async (studentId: string) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini? Semua data laporan terkait akan tetap ada.")) {
            try {
                await api.deleteStudent(studentId);
                onDataChange();
            } catch (error) {
                console.error("Failed to delete student", error);
            }
        }
    };

    const handleModalSave = () => {
        setIsModalOpen(false);
        onDataChange();
    };

    const studentsByClass = useMemo(() => {
        return students.reduce((acc, student) => {
            (acc[student.class] = acc[student.class] || []).push(student);
            return acc;
        }, {} as Record<string, Student[]>);
    }, [students]);
    
    const sortedClasses = Object.keys(studentsByClass).sort();

    return (
        <div className="space-y-6">
            <Card>
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Kelola Data Siswa</h2>
                    <Button onClick={handleAddStudent} className="w-auto">
                        <PlusIcon />
                        Tambah Siswa
                    </Button>
                </div>
            </Card>

            {sortedClasses.length > 0 ? (
                sortedClasses.map(className => (
                    <Card key={className}>
                        <h3 className="text-xl font-bold mb-4 border-b pb-2">Kelas {className}</h3>
                        <ul className="divide-y divide-slate-200/80">
                            {studentsByClass[className].map(student => (
                                <li key={student.id} className="py-2 flex justify-between items-center transition-colors duration-150 hover:bg-slate-50 -mx-6 px-6">
                                    <span className="text-slate-800 font-medium">{student.fullName}</span>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleEditStudent(student)} 
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-sky-100 hover:text-sky-600 transition-colors"
                                            aria-label={`Edit ${student.fullName}`}
                                        >
                                            <PencilIcon />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteStudent(student.id)} 
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                                            aria-label={`Hapus ${student.fullName}`}
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))
            ) : (
                <Card className="text-center">
                    <p className="text-slate-500">Belum ada siswa yang terdaftar.</p>
                </Card>
            )}

            {isModalOpen && (
                <StudentFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleModalSave}
                    student={editingStudent}
                    teacherId={teacherId}
                />
            )}
        </div>
    );
};

// Icons
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);
const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2-2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

export default StudentManagement;
