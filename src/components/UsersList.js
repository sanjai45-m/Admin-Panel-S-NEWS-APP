import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UsersList.css'; // Import your CSS file for styling
import UsersSection from './UsersSection';
import GroupsSection from './GroupsSection';
import Sidebar from './Sidebar';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [chatGroups, setChatGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('users');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('baseurl/users.json');
        const data = response.data;
        const usersList = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })) : [];
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeSection === 'groups') {
      const fetchGroups = async () => {
        try {
          const response = await axios.get('baseurl/chat_groups.json');
          const data = response.data;
          const groupsList = data ? Object.keys(data).map(key => ({
            id: key,
            name: key, // Use ID as group name
            ...data[key]
          })) : [];
          setChatGroups(groupsList);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching chat groups:', error);
          setError('Failed to fetch chat groups. Please try again later.');
          setLoading(false);
        }
      };

      fetchGroups();
    }
  }, [activeSection]);

  return (
    <div className="admin-panel">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="main-content">
        {activeSection === 'users' && (
          <UsersSection 
            users={users} 
            setUsers={setUsers} 
            showForm={showForm} 
            setShowForm={setShowForm}
          />
        )}
        {activeSection === 'groups' && (
          <GroupsSection 
            chatGroups={chatGroups} 
            setChatGroups={setChatGroups} 
            showForm={showForm} 
            setShowForm={setShowForm}
          />
        )}
        {/* Add other sections for settings and reports here */}
      </div>
    </div>
  );
};

export default UsersList;
