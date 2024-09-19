import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editingUser, setEditingUser] = useState(null)

  // const fetchUsers = async () => {
  //   try {
  //     const response = await axios.get('https://activant-2-backend-1.onrender.com/api/users');
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error('Error fetching users', error);
  //   }
  // };

  // 
 
  const fetchUsers = async (page = 1) => {
    try {
      const response = await axios.get('https://activant-2-backend-1.onrender.com/api/users', {
        params: { page, limit: 5 }  
      });
  
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages); 
      // No need to set currentPage from the response
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };
  
  

  

  // Fetch users on initial render
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  // Submission function
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('https://activant-2-backend-1.onrender.com/api/users', {
  //       name,
  //       email,
  //       address,
  //     });
  //     setUsers([...users, response.data]);
  //     setName('');
  //     setEmail('');
  //     setAddress('');
  //   } catch (error) {
  //     console.error('Error saving user', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (editingUser) {
      // Update existing user
      try {
        const response = await axios.put(`https://activant-2-backend-1.onrender.com/api/users/${editingUser._id}`, {
          name,
          email,
          address,
        });
  
        setUsers(users.map(user => user._id === editingUser._id ? response.data : user));
  
        setEditingUser(null);
        setName('');
        setEmail('');
        setAddress('');
      } catch (error) {
        console.error('Error updating user', error);
      }
    } else {
      // Add new user
      try {
        const response = await axios.post('https://activant-2-backend-1.onrender.com/api/users', {
          name,
          email,
          address,
        });
  
        setUsers([...users, response.data]);
        setName('');
        setEmail('');
        setAddress('');
      } catch (error) {
        console.error('Error saving user', error);
      }
    }
  };
  
  // Delete User

  const handleDelete = async (userId) => {
    try{
      await axios.delete(`https://activant-2-backend-1.onrender.com/api/users/${userId}`)
      setUsers(users.filter(user => user._id !== userId))
    } catch (error) {
      console.error('Error deleting user', error)
    }
  }

  // Update User

  const handleEdit = (user) => {
    setName(user.name)
    setEmail(user.email)
    setAddress(user.address)
    setEditingUser(user)
  }


 
  return (
    <div>
   
<h1>{editingUser ? 'Edit User' : 'Add User'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">{editingUser ? 'Update' : 'Add'}</button>
        {editingUser && (
          <button type="button" onClick={() => setEditingUser(null)} className="cancel-btn">
            Cancel
          </button>
        )}
      </form>
      <h2>Users</h2>
     <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email address</th>
          <th>Address</th>
          <th>Delete user</th>
          <th>Update user</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>
                <button onClick={() => handleDelete(user._id)} className="delete-btn">
                  Delete
                </button>
              </td>
              <td>
              <button onClick={() => handleEdit(user)} className="edit-btn">
                  Edit
                </button>
              </td>
          </tr>
        ))}
      </tbody>
     </table>
     <div className="pagination">
  <button
    disabled={currentPage === 1}   
    onClick={() => setCurrentPage(currentPage - 1)}  
  >
    Previous
  </button>

  <span>Page {currentPage} of {totalPages}</span>

  <button
    disabled={currentPage === totalPages}   
    onClick={() => setCurrentPage(currentPage + 1)}  
  >
    Next
  </button>
</div>

    </div>
  );
};

export default App;
