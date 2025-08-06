import React, { useState } from 'react';
import { LogIn, Users, Code, Cpu, Database, Globe } from 'lucide-react';

interface LoginPageProps {
  onLogin: (rollNo: string) => void;
  onViewHall: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onViewHall }) => {
  const [rollNo, setRollNo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNo.trim()) return;

    setLoading(true);
    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    onLogin(rollNo.toUpperCase());
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Floating Tech Icons */}
        <div className="absolute top-20 left-20 text-slate-600 opacity-20 animate-pulse">
          <Code size={40} />
        </div>
        <div className="absolute top-40 right-32 text-slate-600 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
          <Cpu size={35} />
        </div>
        <div className="absolute bottom-40 left-32 text-slate-600 opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>
          <Database size={30} />
        </div>
        <div className="absolute bottom-20 right-20 text-slate-600 opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>
          <Globe size={45} />
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-600/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="relative mb-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto shadow-2xl border border-slate-600">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  DR
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur-xl"></div>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
                DEVS
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent ml-2">
                REC
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="space-y-2">
              <p className="text-slate-300 text-xl font-medium">Recruitment Results Portal</p>
              <p className="text-slate-400 text-sm">Technical Excellence • Innovation • Growth</p>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/50">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Access Your Results</h2>
              <p className="text-slate-400 text-sm">Enter your roll number to check your recruitment status</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="rollNo" className="block text-slate-300 text-sm font-medium mb-3">
                  Roll Number
                </label>
                <div className="relative">
                  <input
                    id="rollNo"
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g., 21CSE001"
                    className="w-full px-4 py-4 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg font-mono"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 focus-within:from-cyan-400/10 focus-within:via-transparent focus-within:to-blue-400/10 pointer-events-none transition-all duration-300"></div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !rollNo.trim()}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Check Results</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Hall of Selection Link */}
          <div className="text-center mt-8">
            <button
              onClick={onViewHall}
              className="group inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-slate-800/30"
            >
              <Users size={18} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">View Hall of Selection</span>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-12 space-y-2">
            <p className="text-slate-500 text-xs">
              © 2024 DEVS REC • Technical Club
            </p>
            <div className="flex justify-center space-x-4 text-slate-600">
              <Code size={16} />
              <Cpu size={16} />
              <Database size={16} />
              <Globe size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};