import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Subjects from './pages/Subjects'
import Chapters from './pages/Chapters'
import ChapterDetails from './pages/ChapterDetails'
import Flashcards from './pages/Flashcards'
import Quiz from './pages/Quiz'
import Chatbot from './pages/Chatbot'
import Progress from './pages/Progress'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/chapters" element={<Navigate to="/subjects" replace />} />
          <Route path="/chapters/:subjectId" element={<Chapters />} />
          <Route path="/chapter/:chapterId" element={<ChapterDetails />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/flashcards/:chapterId" element={<Flashcards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:chapterId" element={<Quiz />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/progress" element={<Progress />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
