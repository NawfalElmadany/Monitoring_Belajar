
export enum UserRole {
    GURU = 'guru',
    WALI_MURID = 'wali_murid'
}

export interface User {
    id: string;
    username: string;
    fullName: string;
    role: UserRole;
    studentId?: string; // Only for wali_murid
}

export interface Student {
    id: string;
    fullName: string;
    class: string;
    teacherId: string;
    parentId: string;
}

export enum ReportType {
    IQRO = 'iqro',
    HAFALAN = 'hafalan'
}

export interface BaseProgressReport {
    id: string;
    studentId: string;
    date: string; // ISO string
    grade: number;
    notes: string;
    teacherId: string;
}

export interface IqroProgress extends BaseProgressReport {
    type: ReportType.IQRO;
    level: number;
    page: number;
}

export interface SurahProgress extends BaseProgressReport {
    type: ReportType.HAFALAN;
    surahName: string;
    startAyah: number;
    endAyah: number;
}

export type ProgressReport = IqroProgress | SurahProgress;
