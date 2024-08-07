import React, { useState } from 'react';
import './styles.css';

const Modal = ({ setIsModalVisible, type, onClickHandler }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="modal">
      <div className="modal__content">
        <h4 className="modal__title">{type === 'create' ? 'Create new' : 'Update'} chat</h4>
        <input
          type="text"
          className="modal__input"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="modal__input"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div className="modal__buttons">
          <button className="modal__button" onClick={closeModal}>
            Close
          </button>
          <button className="modal__button" onClick={() => onClickHandler({ firstName, lastName })}>
            {type === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
