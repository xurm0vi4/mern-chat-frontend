import React from 'react';
import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';

import './styles.css';

const MainPage = () => {
  return (
    <div className="main">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default MainPage;
