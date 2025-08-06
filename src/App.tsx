import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { ScratchCard } from './components/ScratchCard';
import { HallOfSelection } from './components/HallOfSelection';
import SplashScreen from './components/SplashScreen';

type AppState = 'login' | 'scratch-card' | 'hall-of-selection';

interface SelectedStudent {
  roll_no: string;
  name: string;
  role: string;
  description?: string;
}

interface NotSelectedStudent {
  roll_no: string;
  name: string;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [currentStudent, setCurrentStudent] = useState<{
    isSelected: boolean;
    name?: string;
    role?: string;
  } | null>(null);

  const handleLogin = async (rollNo: string) => {
    try {
      // Check selected students
      const selectedResponse = await fetch('/data/selected.json');
      const selectedStudents: SelectedStudent[] = await selectedResponse.json();
      
      const selectedStudent = selectedStudents.find(s => s.roll_no === rollNo);
      
      if (selectedStudent) {
        setCurrentStudent({
          isSelected: true,
          name: selectedStudent.name,
          role: selectedStudent.role
        });
        setCurrentState('scratch-card');
        return;
      }

      // Check not selected students
      const notSelectedResponse = await fetch('/data/not_selected.json');
      const notSelectedStudents: NotSelectedStudent[] = await notSelectedResponse.json();
      
      const notSelectedStudent = notSelectedStudents.find(s => s.roll_no === rollNo);
      
      if (notSelectedStudent) {
        setCurrentStudent({
          isSelected: false,
          name: notSelectedStudent.name
        });
        setCurrentState('scratch-card');
        return;
      }

      // Roll number not found, show hall of selection
      setCurrentState('hall-of-selection');
    } catch (error) {
      console.error('Error checking results:', error);
      // Fallback to hall of selection
      setCurrentState('hall-of-selection');
    }
  };

  const handleBack = () => {
    console.log('Back button clicked, navigating to login');
    setCurrentState('login');
    setCurrentStudent(null);
  };

  const handleViewHall = () => {
    setCurrentState('hall-of-selection');
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (currentState === 'scratch-card' && currentStudent) {
    return (
      <ScratchCard
        isSelected={currentStudent.isSelected}
        studentName={currentStudent.name}
        role={currentStudent.role}
        onBack={handleBack}
      />
    );
  }

  if (currentState === 'hall-of-selection') {
    return <HallOfSelection onBack={handleBack} />;
  }

  return (
    <LoginPage
      onLogin={handleLogin}
      onViewHall={handleViewHall}
    />
  );
}

export default App;