import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomePage from './pages/Home'
import VideoFeedPage from './pages/VideoFeedPage'
import VideoDetailPage from './pages/VideoDetailPage'
import UploadVideoPage from './pages/UploadVideoPage'
import MyVideosPage from './pages/MyVideosPage'
import Navbar from './components/Navbar'
import VideoPlayer from './components/VideoPlayer'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/feed' element={<VideoFeedPage />} />
          <Route path='/video/:id' element={<VideoDetailPage />} />
          <Route path='/upload' element={<UploadVideoPage />} />
          <Route path='/my-videos' element={<MyVideosPage />} />
          <Route path='/test' element={<VideoPlayer />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
