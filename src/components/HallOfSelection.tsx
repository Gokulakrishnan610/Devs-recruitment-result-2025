import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Users, Award } from 'lucide-react';
import Galaxy from './Galaxy';

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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Galaxy 
          mouseRepulsion={false}
          mouseInteraction={false}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.0}
          hueShift={0}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-white/80 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-xl border border-white/20 mb-6"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Portal</span>
          </button>

          <div className="text-center bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <h1 className="text-5xl font-bold mb-3">
              <span className="text-white">Hall of</span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> Selection</span>
            </h1>
            <p className="text-white/90 text-lg mb-2">Meet our newly selected DEVS Board members</p>
            <p className="text-white/70">Technical Excellence • Leadership • Innovation</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl p-8 border border-white/15 hover:bg-white/12 hover:shadow-cyan-500/30 transition-all duration-500 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20">
                <Users className="text-cyan-400" size={32} />
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{students.length}</div>
              <div className="text-white/80 text-lg">Total Selected</div>
            </div>
          </div>
          
          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl p-8 border border-white/15 hover:bg-white/12 hover:shadow-cyan-500/30 transition-all duration-500 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20">
                <Award className="text-cyan-400" size={32} />
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{roles.length - 1}</div>
              <div className="text-white/80 text-lg">Different Roles</div>
            </div>
          </div>
          
          <div className="bg-white/8 backdrop-blur-2xl rounded-3xl p-8 border border-white/15 hover:bg-white/12 hover:shadow-cyan-500/30 transition-all duration-500 shadow-2xl">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20">
                <Filter className="text-cyan-400" size={32} />
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{filteredStudents.length}</div>
              <div className="text-white/80 text-lg">Currently Showing</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div className="flex flex-wrap gap-3 justify-center">
              {roles.map(role => (
                <button
                  key={role}
                  onClick={() => handleRoleFilter(role)}
                  className={`px-6 py-3 rounded-2xl transition-all duration-500 backdrop-blur-xl ${
                    selectedRole === role
                      ? 'bg-cyan-500/80 text-white font-medium shadow-2xl shadow-cyan-500/40 border border-cyan-400/30'
                      : 'bg-white/8 text-white hover:bg-white/15 border border-white/20 backdrop-blur-xl hover:shadow-lg'
                  }`}
                >
                  {role} {role !== 'All' && `(${students.filter(s => s.role === role).length})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredStudents.map((student, index) => (
            <div
              key={student.roll_no}
              className="bg-white/8 backdrop-blur-2xl rounded-3xl p-8 border border-white/15 hover:bg-white/12 hover:shadow-cyan-500/30 transition-all duration-500 shadow-2xl group"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <span className="text-white font-bold text-xl">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{student.name}</h3>
                <div className="inline-block px-4 py-2 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 mb-3">
                  <p className="text-green-400 text-sm font-medium">{student.role}</p>
                </div>
                <p className="text-white/80 text-sm mb-3 font-mono">{student.roll_no}</p>
                <p className="text-white/70 text-sm leading-relaxed">{student.description}</p>
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

      <style>{`
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