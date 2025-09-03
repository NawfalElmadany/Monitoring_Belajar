
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { api } from '../services/api';
import { ProgressReport } from '../types';
import ProgressCard from './ProgressCard';
import Card from './ui/Card';

const ParentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [progress, setProgress] = useState<ProgressReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProgress = useCallback(async () => {
        if (user && user.studentId) {
            setIsLoading(true);
            try {
                const progressReports = await api.getProgressByStudent(user.studentId);
                setProgress(progressReports);
            } catch (error) {
                console.error("Failed to fetch progress", error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        fetchProgress();
    }, [fetchProgress]);

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Perkembangan Belajar Anak Anda</h2>
                 {isLoading ? (
                    <div className="text-center p-8">
                        <p className="text-gray-500">Memuat data perkembangan...</p>
                    </div>
                 ) : (
                    <div className="space-y-4">
                        {progress.length > 0 ? (
                            progress.map(p => <ProgressCard key={p.id} report={p} isReadOnly />)
                        ) : (
                            <div className="text-center p-8 bg-gray-50 rounded-lg">
                                 <p className="text-gray-500">Belum ada laporan perkembangan yang dicatat.</p>
                            </div>
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ParentDashboard;
