import { MOCK_USERS, MOCK_STUDENTS, MOCK_PROGRESS } from '../constants';
import { User, Student, ProgressReport, TartiliProgress, SurahProgress } from '../types';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let progressData: ProgressReport[] = [...MOCK_PROGRESS];
let studentData: Student[] = [...MOCK_STUDENTS];


export const api = {
    login: async (username: string, password_unused: string): Promise<User | null> => {
        await delay(500);
        const user = MOCK_USERS.find(u => u.username === username);
        // In a real app, password would be checked. Here we just find by username.
        return user || null;
    },

    getStudentsByTeacher: async (teacherId: string): Promise<Student[]> => {
        await delay(500);
        return studentData.filter(s => s.teacherId === teacherId);
    },

    getProgressByStudent: async (studentId: string): Promise<ProgressReport[]> => {
        await delay(500);
        return progressData
            .filter(p => p.studentId === studentId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },
    
    getAllProgressByTeacher: async (teacherId: string): Promise<ProgressReport[]> => {
        await delay(700);
        const teacherStudents = studentData.filter(s => s.teacherId === teacherId).map(s => s.id);
        return progressData.filter(p => teacherStudents.includes(p.studentId));
    },

    addProgressReport: async (report: Omit<TartiliProgress, 'id'> | Omit<SurahProgress, 'id'>): Promise<ProgressReport> => {
        await delay(500);
        const newReport: ProgressReport = {
            ...report,
            id: `p${Date.now()}`,
        };
        progressData.unshift(newReport);
        return newReport;
    },

    addStudent: async (student: Omit<Student, 'id'>): Promise<Student> => {
        await delay(500);
        const newStudent: Student = {
            ...student,
            id: `s${Date.now()}`,
        };
        studentData.push(newStudent);
        return newStudent;
    },

    updateStudent: async (studentId: string, updates: Partial<Omit<Student, 'id'>>): Promise<Student | null> => {
        await delay(500);
        const studentIndex = studentData.findIndex(s => s.id === studentId);
        if (studentIndex > -1) {
            studentData[studentIndex] = { ...studentData[studentIndex], ...updates };
            return studentData[studentIndex];
        }
        return null;
    },

    deleteStudent: async (studentId: string): Promise<boolean> => {
        await delay(500);
        const initialLength = studentData.length;
        studentData = studentData.filter(s => s.id !== studentId);
        return studentData.length < initialLength;
    },
};