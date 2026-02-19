import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { StudyMaterial } from './pages/StudyMaterial';
import { TopicTracker } from './pages/TopicTracker';
import { Analytics } from './pages/Analytics';
import { Flashcards } from './pages/Flashcards';
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './components/auth/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }>
            <Route index element={<Dashboard />} />
            <Route path="study-material" element={<StudyMaterial />} />
            <Route path="topic-tracker" element={<TopicTracker />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="flashcards" element={<Flashcards />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
