import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import { LandingPage, SetupPage, Dashboard } from './pages';

function App() {
  const student = useStore((state) => state.student);
  const schedule = useStore((state) => state.schedule);
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/setup" 
            element={<SetupPage />} 
          />
          <Route 
            path="/dashboard" 
            element={
              student && schedule ? <Dashboard /> : <Navigate to="/setup" />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
