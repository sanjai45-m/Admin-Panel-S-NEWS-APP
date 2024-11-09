import React from 'react';
import Modal from 'react-modal';
import './LogoutPopup.css';

const LogoutPopup = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className="popup"
      overlayClassName="popup-overlay"
    >
      <h2>Confirm Logout</h2>
      <p>Are you sure you want to log out?</p>
      <div className="popup-buttons">
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </Modal>
  );
};

export default LogoutPopup;
