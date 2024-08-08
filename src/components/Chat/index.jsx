import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import io from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { deleteChat } from '../../redux/slices/chats';

import Message from '../Message';
import Modal from '../Modal';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import noavatar from '../../assets/noavatar.png';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [messages, setMessages] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (id) {
      fetchData();
      const socket = io('https://mern-chat-backend-kj9n.onrender.com');
      socket.on('newMessage', (data) => {
        if (data.chat === id) {
          setMessages((prev) => [...prev, data.message]);
          if (data.message.isBot) {
            toast.info('New message received');
          }
        }
      });
      return () => socket.disconnect();
    }
  }, [id, isModalVisible, messages]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/chats/${id}`);
      setData(data);
      setMessages(messages);
    } catch (error) {
      console.warn(error);
    }
  };

  const openPopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const deleteChatHandler = () => {
    if (window.confirm('Are you sure you want to delete this chat?')) {
      dispatch(deleteChat(id));
      navigate('/chats');
      setIsPopupVisible(false);
    }
  };

  const updateChat = async (params) => {
    const { data } = await axios.put(`/api/chats/${id}`, params);
    setIsPopupVisible(false);
    setIsModalVisible(false);
    return data;
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const sendMessage = async () => {
    await axios.post(`/api/chat/${id}/message`, { text: inputText });
    setInputText('');
    setTimeout(async () => {
      await axios.post(`/api/chat/${id}/message/bot`);
      return data;
    }, 3000);
  };

  console.log(messages);

  return (
    <div className="chat">
      {id && data ? (
        <>
          <div className="chat__header">
            <div className="chat__header_info">
              <img src={noavatar} alt="avatar" />
              <h3>
                {data?.firstName} {data?.lastName}
              </h3>
            </div>
            <svg
              onClick={openPopup}
              className="bi bi-three-dots-vertical"
              fill="currentColor"
              height="30"
              viewBox="0 0 16 16"
              width="30"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
            {isPopupVisible && (
              <ul className="chat__header_popup">
                <li onClick={openModal}>Update chat</li>
                <li onClick={deleteChatHandler}>Delete chat</li>
                {isModalVisible && (
                  <Modal
                    type="update"
                    setIsModalVisible={setIsModalVisible}
                    onClickHandler={updateChat}
                  />
                )}
              </ul>
            )}
          </div>
          <div className="chat__conversation">
            {data?.messages?.length > 0 ? (
              data.messages.map((message) => (
                <Message
                  {...message}
                  key={message._id}
                  messages={messages}
                  setMessages={setMessages}
                />
              ))
            ) : (
              <h2 className="chat__missing">Type something to start chatting...</h2>
            )}
          </div>
          <div className="chat__send">
            <div className="chat__send_input">
              <input
                type="text"
                placeholder="Type your message"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <svg
                onClick={() => sendMessage()}
                height="30"
                viewBox="0 0 48 48"
                width="30"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M4.02 42l41.98-18-41.98-18-.02 14 30 4-30 4z" />
                <path d="M0 0h48v48h-48z" fill="none" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <h2 className="chat__missing">Select chat to start chatting...</h2>
      )}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
};

export default Chat;
