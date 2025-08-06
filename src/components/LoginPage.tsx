

import React, { useState, useEffect } from 'react';
import { LogIn, Users, Code, Cpu, Database, Globe } from 'lucide-react';
import Particles from './Particles';
import TextCursor from './TextCursor';
import TextPressure from './TextPressure';
import CurvedLoop from './CurvedLoop';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface LoginPageProps {
  onLogin: (rollNo: string) => void;
  onViewHall: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onViewHall }) => {
  const [rollNo, setRollNo] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Particles Background */}
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <Particles
            particleColors={['#ffffff', '#ffffff']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        
        {/* Gradient Overlays */}
        {/* <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div> */}
        {/* <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl"></div> */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/3 via-white/2 to-white/3 rounded-full blur-3xl"></div> */}
      </div>

      {/* TextCursor Overlay */}
      {/* <div className="absolute inset-0 z-25">
        <TextCursor
          text="DEVS"
          delay={0}
          spacing={100}
          followMouseDirection={true}
          randomFloat={true}
          exitDuration={0.3}
          removalInterval={20}
          maxPoints={10}
        />
      </div> */}



      <div className="relative z-10 min-h-screen flex flex-col justify-center p-8">
        {/* Hero Section */}
        <div className="text-center mb-4" data-aos="fade-down" data-aos-delay="200">
          <div className="h-80 mb-2 flex items-center justify-center">
            <TextPressure
              text="DEVS REC"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={48}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Access Your Results Section - Full Width */}
          <div className="bg-transparent backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-600/20" data-aos="fade-up" data-aos-delay="400">
            <div className="text-center mb-8" data-aos="fade-up" data-aos-delay="600">
              <h2 className="text-3xl font-bold text-white mb-2">Access Your Results</h2>
              <p className="text-gray-400">Enter your roll number to check your recruitment status</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6" data-aos="fade-up" data-aos-delay="800">
              <div data-aos="fade-up" data-aos-delay="1000">
                <label htmlFor="rollNo" className="block text-gray-300 text-sm font-medium mb-3">
                  Roll Number
                </label>
                <div className="relative">
                  <input
                    id="rollNo"
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g., 2xxxxxxxxxx"
                    className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg font-mono"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/0 to-cyan-400/0 focus-within:from-cyan-400/10 focus-within:via-transparent focus-within:to-cyan-400/10 pointer-events-none transition-all duration-300"></div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !rollNo.trim()}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
                data-aos="fade-up" data-aos-delay="1200"
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

          {/* Two Column Layout for Features */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Why Choose DEVS REC Section */}
            <div className="bg-transparent backdrop-blur-sm rounded-2xl p-8 border border-gray-600/20" data-aos="fade-right" data-aos-delay="600">
              <h3 className="text-2xl font-bold text-white mb-4" data-aos="fade-up" data-aos-delay="800">✨ Why Choose DEVS REC?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="1000">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Cutting-edge technical challenges</span>
                </div>
                <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="1100">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Innovation-driven environment</span>
                </div>
                <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="1200">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Continuous learning opportunities</span>
                </div>
                <div className="flex items-center space-x-3" data-aos="fade-up" data-aos-delay="1300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Collaborative team culture</span>
                </div>
              </div>
            </div>

            {/* Ready to Join Section */}
            <div className="bg-transparent backdrop-blur-sm rounded-2xl p-8 border border-gray-600/20" data-aos="fade-left" data-aos-delay="600">
              <h3 className="text-2xl font-bold text-white mb-4" data-aos="fade-up" data-aos-delay="800">🚀 Ready to Join?</h3>
              <p className="text-gray-300 mb-4" data-aos="fade-up" data-aos-delay="1000">Check your recruitment status and discover your role in our technical community.</p>
              <button
                onClick={onViewHall}
                className="group inline-flex items-center space-x-3 text-gray-300 hover:text-white transition-all duration-300 px-6 py-3 rounded-xl hover:bg-gray-800/50 border border-gray-600 hover:border-gray-500"
                data-aos="fade-up" data-aos-delay="1200"
              >
                <Users size={20} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">View Hall of Selection</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4" data-aos="fade-up" data-aos-delay="800">
          <div className="flex justify-center space-x-6 text-gray-500">
            <div className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="1000">
              <Code size={18} />
              <span className="text-sm">Development</span>
            </div>
            <div className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="1100">
              <Cpu size={18} />
              <span className="text-sm">Innovation</span>
            </div>
            <div className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="1200">
              <Database size={18} />
              <span className="text-sm">Technology</span>
            </div>
            <div className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="1300">
              <Globe size={18} />
              <span className="text-sm">Global</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm" data-aos="fade-up" data-aos-delay="1400">
            © 2025 DEVS REC • Technical Club
          </p>
        </div>
      </div>
    </div>
  );
};