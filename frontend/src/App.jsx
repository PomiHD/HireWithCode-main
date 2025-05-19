import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import GuidePage from './pages/GuidePage';
import AcceptChallengePage from './pages/AcceptChallengePage';
import CompleteChallengePage from './pages/CompleteChallengePage';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/accept-challenge" element={<AcceptChallengePage />} />
        <Route path="/complete-challenge" element={<CompleteChallengePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
