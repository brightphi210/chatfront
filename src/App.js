import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePage from './Pages/CreatePage';
import './App.css'

import AOS from 'aos';
import 'aos/dist/aos.css';
import StartPage from './Pages/StartPage';
import JoinPage from './Pages/JoinPage';
import ChatPage from './Pages/ChatPage';
import { UserProvider } from './Context';
AOS.init();

function App() {
  return (
    <div className="App">
      <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/chats/:room" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
