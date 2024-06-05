import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import PostDetails from './components/PostDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
