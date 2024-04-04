import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginContents from './components/LoginContents';
import SignUpContents from './components/SignUpContents';
import MainMediaContents from './components/MainMediaContents';

function App() {


  return (
    <div className="App">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LoginContents />} />
        <Route path="/signUp" element={<SignUpContents />} />
        <Route path="/mediaMain" element={<MainMediaContents />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
