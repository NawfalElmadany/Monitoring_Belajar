import { MOCK_USERS, MOCK_STUDENTS, MOCK_PROGRESS } from '../constants';
import { User, Student, ProgressReport, TartiliProgress, SurahProgress } from '../types';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let progressData: ProgressReport[] = [...MOCK_PROGRESS];

export const api = {
    login: async (username: string, password_unused: string): Promise<User | null> => {
        await delay(500);
        const user = MOCK_USERS.find(u => u.username === username);
        // In a real app, password would be checked. Here we just find by username.
        return user || null;
    },

    getStudentsByTeacher: async (teacherId: string): Promise<Student[]> => {
        await delay(500);
        return MOCK_STUDENTS.filter(s => s.teacherId === teacherId);
    },

    getProgressByStudent: async (studentId: string): Promise<ProgressReport[]> => {
        await delay(500);
        return progressData
            .filter(p => p.studentId === studentId)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    },

    addProgressReport: async (report: Omit<TartiliProgress, 'id' | 'date'> | Omit<SurahProgress, 'id' | 'date'>): Promise<ProgressReport> => {
        await delay(500);
        const newReport: ProgressReport = {
            ...report,
            id: `p${Date.now()}`,
            date: new Date().toISOString(),
        };
        progressData.unshift(newReport);
        return newReport;
    },
};