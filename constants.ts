import { Student, User, UserRole, ProgressReport, ReportType } from './types';

export const JUZ_AMMA_SURAHS = [
  "An-Naba'", "An-Nazi'at", "'Abasa", "At-Takwir", "Al-Infitar",
  "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la",
  "Al-Ghashiyah", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail",
  "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-'Alaq", "Al-Qadr",
  "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat", "Al-Qari'ah",
  "At-Takathur", "Al-'Asr", "Al-Humazah", "Al-Fil", "Quraysh",
  "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad",
  "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

export const MOCK_USERS: User[] = [
    { id: 'guru1', username: 'ustad_ahmad', fullName: 'Ustad Ahmad', role: UserRole.GURU },
    { id: 'wali1', username: 'budi_ayah', fullName: 'Bapak Budi', role: UserRole.WALI_MURID, studentId: 'siswa1' },
    { id: 'wali2', username: 'siti_ibu', fullName: 'Ibu Siti', role: UserRole.WALI_MURID, studentId: 'siswa2' },
];

export const MOCK_STUDENTS: Student[] = [
    { id: 'siswa1', fullName: 'Budi Hartono', class: 'A', teacherId: 'guru1', parentId: 'wali1' },
    { id: 'siswa2', fullName: 'Siti Aminah', class: 'A', teacherId: 'guru1', parentId: 'wali2' },
    { id: 'siswa3', fullName: 'Charlie Wijaya', class: 'B', teacherId: 'guru1', parentId: 'wali3' },
];

export const MOCK_PROGRESS: ProgressReport[] = [
    {
        id: 'p1', studentId: 'siswa1', date: new Date(Date.now() - 86400000 * 2).toISOString(), type: ReportType.TARTILI,
        level: 2, page: 15, grade: 85, notes: 'Sudah lancar, perlu perhatikan panjang pendek.', teacherId: 'guru1'
    },
    {
        id: 'p2', studentId: 'siswa1', date: new Date(Date.now() - 86400000).toISOString(), type: ReportType.HAFALAN,
        surahName: 'An-Nas', startAyah: 1, endAyah: 6, grade: 90, notes: 'Hafalan sangat lancar.', teacherId: 'guru1'
    },
    {
        id: 'p3', studentId: 'siswa2', date: new Date(Date.now() - 86400000).toISOString(), type: ReportType.TARTILI,
        level: 4, page: 5, grade: 80, notes: 'Masih sedikit terbata-bata.', teacherId: 'guru1'
    },
     {
        id: 'p4', studentId: 'siswa1', date: new Date().toISOString(), type: ReportType.TARTILI,
        level: 2, page: 16, grade: 90, notes: 'Makhraj huruf sudah lebih baik.', teacherId: 'guru1'
    },
];