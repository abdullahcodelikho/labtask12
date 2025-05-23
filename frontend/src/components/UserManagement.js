import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    isAdmin: false
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { 'x-auth-token': token }
      });
      setUsers(res.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: { 'x-auth-token': token }
        });
        fetchUsers();
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${editingUser}`, editForm, {
        headers: { 'x-auth-token': token }
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError('Failed to update user');
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUser === user._id ? (
                    <input
                      type="email"
                      className="form-control"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser === user._id ? (
                    <input
                      type="checkbox"
                      checked={editForm.isAdmin}
                      onChange={(e) => setEditForm({...editForm, isAdmin: e.target.checked})}
                    />
                  ) : (
                    user.isAdmin ? 'Yes' : 'No'
                  )}
                </td>
                <td>
                  {editingUser === user._id ? (
                    <>
                      <button className="btn btn-success btn-sm me-2" onClick={handleUpdate}>
                        Save
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingUser(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(user)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 