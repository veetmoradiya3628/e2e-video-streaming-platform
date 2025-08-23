import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/Home'
import VideoFeedPage from './pages/VideoFeedPage'
import VideoDetailPage from './pages/VideoDetailPage'
import UploadVideoPage from './pages/UploadVideoPage'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/feed' element={
            <ProtectedRoute>
              <VideoFeedPage />
            </ProtectedRoute>
          } />
          <Route path='/video/:id' element={
            <ProtectedRoute>
              <VideoDetailPage />
            </ProtectedRoute>
          } />
          <Route path='/video-upload' element={
            <ProtectedRoute>
              <UploadVideoPage />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
