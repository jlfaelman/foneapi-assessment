import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/login';
import RegisterForm from './components/register';
import ChatPage from './components/chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/" element={<ChatPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
