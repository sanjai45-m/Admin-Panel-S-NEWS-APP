import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './UsersSection.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const apiUrl = 'baseurl/users.json';

const UsersSection = ({ users, setUsers, showForm, setShowForm }) => {
  const [newUser, setNewUser] = useState({ id: '', firstName: '', email: '', bookmarkCount: '', pin: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Format PIN to display as asterisks
  const formatPIN = (pin) => {
    return '****'; // Mask PIN with asterisks
  };

  // Add or update user in the database
  const handleAddUser = async () => {
    try {
      if (editingUser) {
        // Update user
        await axios.put(`baseurl/users/${newUser.id}.json`, newUser);
      } else {
        // Add new user
        if (newUser.id) {
          await axios.put(`baseurl/users/${newUser.id}.json`, newUser);
        } else {
          console.error('User ID is required.');
          return;
        }
      }
      // Fetch updated users list
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error('Error adding/updating user:', error);
    }
  };

  // Edit user details
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ id: user.id, firstName: user.firstName, email: user.email, bookmarkCount: user.bookmarkCount, pin: user.pin });
    setShowForm(true);
  };

  // Open delete confirmation modal
  const openModal = (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  // Close delete confirmation modal
  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  // Delete user from database
  const handleDeleteUser = async () => {
    try {
      await axios.delete(`baseurl/users/${userToDelete}.json`);
      // Fetch updated users list
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  // Reset form fields
  const resetForm = () => {
    setNewUser({ id: '', firstName: '', email: '', bookmarkCount: '', pin: '' });
    setEditingUser(null);
    setShowForm(false);
  };

  // Fetch users from the database
  const fetchUsers = async () => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      const usersArray = data ? Object.keys(data).map(key => ({ ...data[key], id: key })) : [];
      setUsers(usersArray);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Users List</h1>
        <button className="add-user-button" onClick={() => setShowForm(true)}>
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </div>
      {showForm && (
        <div className="add-user-form">
          <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
          <label>
            Phone Number:
            <input
              type="text"
              name="id"
              value={newUser.id}
              onChange={handleInputChange}
              disabled={editingUser !== null}
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={newUser.firstName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Bookmark Count:
            <input
              type="number"
              name="bookmarkCount"
              value={newUser.bookmarkCount}
              onChange={handleInputChange}
            />
          </label>
          <label>
            PIN:
            <input
              type="text"
              name="pin"
              value={newUser.pin}
              onChange={handleInputChange}
            />
          </label>
          <div className="buttons">
            <button onClick={handleAddUser}>
              {editingUser ? 'Update User' : 'Add User'}
            </button>
            <button onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Bookmark Count</th>
            <th>PIN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.email}</td>
              <td>{user.bookmarkCount}</td>
              <td>{formatPIN(user.pin)}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditUser(user)}>✎</button>
                <button className="delete-button" onClick={() => openModal(user.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        style={{
          content: {
            width: '200px',
            height: '160px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <center>     <h3>Are you sure you want to delete this user?</h3></center>
        <div className="modal-buttons">
          <button onClick={handleDeleteUser}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </Modal>
    </>
  );
};

export default UsersSection;
