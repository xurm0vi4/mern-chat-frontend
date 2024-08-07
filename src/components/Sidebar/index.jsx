import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/auth';
import { getChats } from '../../redux/slices/chats';

import Preview from '../Preview';
import Modal from '../Modal';

import './styles.css';
import noavatar from '../../assets/noavatar.png';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.data);
  const chats = useSelector((state) => state.chats.items);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filteredChats =
    chats &&
    chats.filter((chat) => {
      const fullName = `${chat.firstName} ${chat.lastName}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
      navigate('/');
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const createChat = async (params) => {
    const { data } = await axios.post('/api/chats', params);
    navigate(`/chats/${data._id}`);
    setIsModalVisible(false);
    return data;
  };

  useEffect(() => {
    dispatch(getChats());
  }, [isModalVisible]);

  return (
    <div className="sidebar">
      <header className="sidebar__header">
        <div className="sidebar__header_info">
          <section className="sidebar__header_info-data">
            <img src={noavatar} alt="avatar" />
            <h3>
              {userInfo?.firstName} {userInfo?.lastName}
            </h3>
          </section>
          <button onClick={onClickLogout} className="sidebar__header_logout">
            Log out
          </button>
        </div>
        <div className="sidebar__header_input">
          <svg
            height="20px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="20px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
          </svg>
          <input
            type="text"
            placeholder="Search chat"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button onClick={openModal} className="sidebar__header_start">
          Start a new chat
        </button>
        {isModalVisible && (
          <Modal type="create" setIsModalVisible={setIsModalVisible} onClickHandler={createChat} />
        )}
      </header>
      <div className="sidebar__content">
        <div className="sidebar__content_title">Chats</div>
        <div className="sidebar__content_chats">
          {filteredChats && filteredChats.map((chat) => <Preview key={chat._id} {...chat} />)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
