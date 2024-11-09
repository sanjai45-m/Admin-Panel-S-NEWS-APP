import React, { useState } from 'react';
import './GroupsSection.css';
import axios from 'axios';

const GroupsSection = ({ chatGroups, setChatGroups, showForm, setShowForm }) => {
  const [newGroupName, setNewGroupName] = useState('');
  const [editingGroup, setEditingGroup] = useState(null);

  const handleSaveGroup = async () => {
    try {
      if (editingGroup) {
        // Update group logic
        const updatedGroupId = newGroupName;
        const updatedGroup = { name: newGroupName };

        // Delete old group
        await axios.delete(`baseurl/chat_groups/${editingGroup.id}.json`);
        
        // Add new group with the new ID
        await axios.put(`baseurl/chat_groups/${updatedGroupId}.json`, updatedGroup);
        
        // Update chatGroups state
        setChatGroups(chatGroups.map(group => (group.id === editingGroup.id ? { ...updatedGroup, id: updatedGroupId } : group)));
      } else {
        // Add new group logic
        const newGroupId = newGroupName;
        const newGroup = { name: newGroupName };
        
        await axios.put(`baseurl/chat_groups/${newGroupId}.json`, newGroup);
        
        setChatGroups([...chatGroups, { ...newGroup, id: newGroupId }]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving group:', error);
    }
  };

  const handleEditGroup = (group) => {
    setEditingGroup(group);
    setNewGroupName(group.name);
    setShowForm(true);
  };

  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`baseurl/chat_groups/${groupId}.json`);
      setChatGroups(chatGroups.filter(group => group.id !== groupId));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const resetForm = () => {
    setNewGroupName('');
    setEditingGroup(null);
    setShowForm(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Chat Groups</h1>
        <button className="add-group-button" onClick={() => setShowForm(true)}>
          {editingGroup ? 'Update Group' : 'Add Group'}
        </button>
      </div>
      {showForm && (
        <div className="add-group-form">
          <h2>{editingGroup ? 'Edit Group' : 'Add New Group'}</h2>
          <label>
            Group Name:
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </label>
          <div className="buttons">
            <button className='add-group-button' onClick={handleSaveGroup}>
              {editingGroup ? 'Update Group' : 'Add Group'}
            </button>
            <button className='cancel-button' onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chatGroups.map(group => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditGroup(group)}>✎</button>
                <button className="delete-button" onClick={() => handleDeleteGroup(group.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupsSection;
