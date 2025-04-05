import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeView from './pages/Home';
import PlayVideo from './pages/PlayVideo';
import News from './pages/News';
import Movies from './pages/Movies';
import AnimatedLogin from './pages/AnimatedLogin';
import Register from './pages/Register';
function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/home" element={<HomeView />} />
      <Route path="/play/:id" element={<PlayVideo />} />
      <Route path="/news" element={<News />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/" element={< AnimatedLogin/>} />
      <Route path="/register" element={< Register/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
