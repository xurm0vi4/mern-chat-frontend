import React from 'react';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';

import './styles.css';
import noavatar from '../../assets/noavatar.png';

const Message = ({ isBot, text, updatedAt, _id, setMessages }) => {
  const { id } = useParams();
  const date = new Date(updatedAt);

  const updateMessage = async () => {
    const text = window.prompt('Edit your message');
    const { data } = await axios.put(`/api/chat/${id}/message`, { _id, text });
    setMessages((prev) => [...prev, data]);
  };

  return (
    <div className={`message ${isBot ? 'message_from_bot' : 'message_from_user'}`}>
      <div className="message__flex">
        {!isBot && (
          <div className="message__edit_wrapper" onClick={updateMessage}>
            <svg
              height="15px"
              version="1.1"
              viewBox="0 0 18 18"
              width="15px"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
              xmlnsXlink="http://www.w3.org/1999/xlink">
              <title />
              <desc />
              <defs />
              <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
                <g fill="#000000" id="Core" transform="translate(-213.000000, -129.000000)">
                  <g id="create" transform="translate(213.000000, 129.000000)">
                    <path
                      d="M0,14.2 L0,18 L3.8,18 L14.8,6.9 L11,3.1 L0,14.2 L0,14.2 Z M17.7,4 C18.1,3.6 18.1,3 17.7,2.6 L15.4,0.3 C15,-0.1 14.4,-0.1 14,0.3 L12.2,2.1 L16,5.9 L17.7,4 L17.7,4 Z"
                      id="Shape"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
        )}
        <img
          src={noavatar}
          alt="avatar"
          className="message__avatar"
          style={{ display: `${isBot ? 'none' : 'block'}` }}
        />
        <p className={`message__text ${isBot ? 'message_from_bot' : 'message_from_user'}`}>
          {text}
        </p>
      </div>
      <p className={`message__date ${isBot ? '' : 'message_from_user'}`}>
        {date.toLocaleString('uk-UK')}
      </p>
    </div>
  );
};

export default Message;
