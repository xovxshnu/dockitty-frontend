import { Routes, Route } from 'react-router-dom';
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <div>
      <h1>Dockitty</h1>
      <Routes>
        <Route path="/" element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App;
