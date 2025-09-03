
import React from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
    return (
        <div className="w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-lg overflow-hidden border border-white/30">
            <Dashboard />
        </div>
    );
};

export default App;