import React, { useState, useEffect } from 'react';
// import SplitText from './SplitText';
import Particles from './Particles';
import GlitchText from './GlitchText';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const timer = setTimeout(() => {
      setShowContent(true);
      // Trigger animation completion after glitch text appears
      setTimeout(() => {
        handleAnimationComplete();
      }, 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    console.log('Glitch animation started!');
    setAnimationComplete(true);
    
    // Wait a bit more before transitioning to main app
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={150}
          particleSpread={8}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/3 via-white/2 to-white/3 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        {/* <div className="relative mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl w-32 h-32 flex items-center justify-center mx-auto shadow-2xl border border-gray-600">
            <div className="text-4xl font-bold text-white">
              DR
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/10 rounded-2xl blur-xl"></div> */}
        {/* </div> */}

        {/* Animated Text */}
        {showContent && (
          <div className="flex items-center justify-center space-x-4">
            <GlitchText
              speed={1}
              enableShadows={true}
              enableOnHover={false}
              className="text-6xl"
            >
              DEVS
            </GlitchText>
            
            <GlitchText
              speed={1.2}
              enableShadows={true}
              enableOnHover={false}
              className="text-6xl"
            >
              REC
            </GlitchText>
          </div>
        )}

        {/* Subtitle */}
        {/* {animationComplete && (
          <div className="mt-8 animate-fade-in">
            <p className="text-gray-300 text-lg font-medium">Recruitment Results Portal</p>
            <p className="text-gray-400 text-sm mt-2">Technical Excellence • Innovation • Growth</p>
          </div>
        )} */}

        {/* Loading Indicator */}
        {/* {!animationComplete && (
          <div className="mt-12 flex flex-col items-center space-y-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-gray-400 text-sm font-medium">Loading...</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default SplashScreen; 