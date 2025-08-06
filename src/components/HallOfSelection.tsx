import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Users, Award } from 'lucide-react';

interface SelectedStudent {
  roll_no: string;
  name: string;
  role: string;
  description?: string;
}

interface HallOfSelectionProps {
  onBack: () => void;
}

export const HallOfSelection: React.FC<HallOfSelectionProps> = ({ onBack }) => {
  const [students, setStudents] = useState<SelectedStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<SelectedStudent[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/data/selected.json');
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error('Error fetching selected students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const roles = ['All', ...Array.from(new Set(students.map(student => student.role)))];

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    if (role === 'All') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(student => student.role === role));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin h-12 w-12 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"></div>
          <p>Loading Hall of Selection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-slate-800/10 via-slate-700/10 to-slate-800/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-slate-800/30 mb-6"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Portal</span>
          </button>

          <div className="text-center">
            <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-2xl border border-slate-600">
              <Award className="text-cyan-400" size={28} />
            </div>
            <h1 className="text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">Hall of</span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent ml-2">Selection</span>
            </h1>
            <p className="text-slate-400 text-xl">Meet our newly selected DEVS Board members</p>
            <p className="text-slate-500 text-sm mt-2">Technical Excellence • Leadership • Innovation</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 text-center border border-slate-700/50 shadow-lg">
            <Users className="text-cyan-400 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{students.length}</div>
            <div className="text-slate-400 font-medium">Total Selected</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 text-center border border-slate-700/50 shadow-lg">
            <Award className="text-blue-400 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{roles.length - 1}</div>
            <div className="text-slate-400 font-medium">Different Roles</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 text-center border border-slate-700/50 shadow-lg">
            <Filter className="text-slate-400 mx-auto mb-2" size={24} />
            <div className="text-2xl font-bold text-white">{filteredStudents.length}</div>
            <div className="text-slate-400 font-medium">Currently Showing</div>
          </div>
        </div>

        {/* Role Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => handleRoleFilter(role)}
                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                  selectedRole === role
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white border border-slate-700/50'
                }`}
              >
                {role} {role !== 'All' && `(${students.filter(s => s.role === role).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student, index) => (
            <div
              key={student.roll_no}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/10"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="text-center">
                <div className="bg-gradient-to-br from-slate-600 to-slate-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-cyan-400 font-bold text-xl shadow-lg border border-slate-600">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{student.name}</h3>
                <p className="text-cyan-300 font-semibold mb-2">{student.role}</p>
                <p className="text-slate-400 text-sm mb-3 font-mono">{student.roll_no}</p>
                {student.description && (
                  <p className="text-slate-400 text-sm leading-relaxed">{student.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-500 text-lg">No students found for the selected role.</div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};