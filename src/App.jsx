import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserInfo } from './redux/slices/auth';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import MainPage from './pages/MainPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/chats" element={<MainPage />} />
        <Route path="/chats/:id" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
