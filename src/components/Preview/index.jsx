import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './styles.css';
import noavatar from '../../assets/noavatar.png';

const Preview = ({ firstName, lastName, messages, updatedAt, _id }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onClickPreview = () => {
    navigate(`/chats/${_id}`);
  };
  const date = new Date(updatedAt).toDateString();

  return (
    <div className={`preview ${id === _id ? 'active' : ''}`} onClick={() => onClickPreview()}>
      <div className="preview__info">
        <img src={noavatar} alt="avatar" className="preview__info_avatar" />
        <div className="preview__info_data">
          <h4>
            {firstName} {lastName}
          </h4>
          <p>
            {messages.length ? messages[messages.length - 1]?.text.slice(0, 50) + '...' : <br />}
          </p>
        </div>
      </div>
      <p className="preview__date">{date}</p>
    </div>
  );
};

export default Preview;
