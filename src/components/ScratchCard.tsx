import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import LetterGlitch from './LetterGlitch';

interface ScratchCardProps {
  isSelected: boolean;
  studentName?: string;
  role?: string;
  onBack: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ 
  isSelected, 
  studentName, 
  role, 
  onBack 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Draw professional scratch coating
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(0.5, '#334155');
    gradient.addColorStop(1, '#475569');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add professional text overlay
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 - 10);
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Your recruitment results await', rect.width / 2, rect.height / 2 + 15);

    let isDrawing = false;

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();

      // Check scratch percentage
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      const percentage = (transparent / (pixels.length / 4)) * 100;
      setScratchPercentage(percentage);

      if (percentage > 30 && !isScratched) {
        setIsScratched(true);
      }
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      scratch(e);
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isScratched]);

  const resetScratch = () => {
    setIsScratched(false);
    setScratchPercentage(0);
    // Trigger re-render of canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const rect = canvas.getBoundingClientRect();
        const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        gradient.addColorStop(0, '#1e293b');
        gradient.addColorStop(0.5, '#334155');
        gradient.addColorStop(1, '#475569');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SCRATCH TO REVEAL', rect.width / 2, rect.height / 2 - 10);
        ctx.font = '12px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('Your recruitment results await', rect.width / 2, rect.height / 2 + 15);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* LetterGlitch Background */}
      <div className="absolute inset-0 z-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>

      {/* Professional Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-slate-800/20 via-slate-700/20 to-slate-800/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-lg w-full relative z-20">
        {/* Back Button - Positioned outside main card */}
        <div className="mb-6 relative z-50 flex gap-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('ScratchCard back button clicked');
              onBack();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="inline-flex items-center space-x-2 text-slate-300 hover:text-cyan-300 transition-all duration-300 px-4 py-2 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20 hover:border-cyan-400/30 shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
            style={{ position: 'relative', zIndex: 999 }}
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Portal</span>
          </button>
        </div>
        
        <div className="bg-transparent backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/50 relative">
          <div className="text-center mb-6">
           
            <h2 className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Recruitment</span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent ml-2">Results</span>
            </h2>
            <p className="text-slate-400">Scratch the card below to reveal your results</p>
          </div>

          <div className="relative">
            {/* Background Message */}
            <div className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 rounded-xl p-8 text-center min-h-[240px] flex items-center justify-center border border-slate-600/50 shadow-xl">
              {isSelected ? (
                <div className="text-white">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Congratulations!</h3>
                  <p className="text-lg mb-3 text-slate-300">You have been selected for</p>
                  <p className="text-2xl font-bold text-cyan-300 mb-3">{role}</p>
                  <p className="text-lg text-slate-300">Welcome to the DEVS Board! 🏆</p>
                  {studentName && (
                    <p className="text-sm mt-4 text-slate-400 font-medium">Welcome aboard, {studentName}!</p>
                  )}
                </div>
              ) : (
                <div className="text-white">
                  <div className="text-6xl mb-4">😌</div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-200">You came really close!</h3>
                  <p className="text-base mb-2 text-slate-300">Don't be disheartened.</p>
                  <p className="text-base text-slate-300">Keep improving and we'll see you in</p>
                  <p className="text-base text-slate-300">the next recruitment window! 💪</p>
                  {studentName && (
                    <p className="text-sm mt-4 text-slate-400 font-medium">Thank you for applying, {studentName}!</p>
                  )}
                </div>
              )}
            </div>

            {/* Scratch Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full rounded-xl cursor-pointer transition-opacity duration-500 z-10 ${
                isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              style={{ touchAction: 'none', pointerEvents: isScratched ? 'none' : 'auto' }}
              onMouseDown={(e) => {
                // Only handle events within the canvas area
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                  // This is a canvas event, let it proceed
                } else {
                  e.stopPropagation();
                }
              }}
            />
          </div>

          {/* Reset Button */}
          {isScratched && (
            <div className="text-center mt-6">
              <button
                onClick={resetScratch}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white transition-all duration-300 border border-slate-600/50 shadow-lg hover:shadow-cyan-500/10"
              >
                <RotateCcw size={16} />
                <span>Scratch Again</span>
              </button>
            </div>
          )}

          {/* Progress Indicator */}
          {!isScratched && scratchPercentage > 0 && (
            <div className="mt-4">
              <div className="bg-slate-700/50 rounded-full h-2 border border-slate-600/30">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(scratchPercentage, 100)}%` }}
                />
              </div>
              <p className="text-slate-400 text-sm text-center mt-2 font-medium">
                {Math.round(scratchPercentage)}% revealed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

