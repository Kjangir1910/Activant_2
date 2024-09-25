import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
const Products = () => {
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  
  // Fetch products with pagination
  const fetchProducts = async (page = 1) => {
    setLoading(true);
    // try {
    //   const response = await axios.get('https://activant-2-backend-1.onrender.com/api/products', {
    //     params: { page, limit: 5 }
    //   });
     try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?page=${page}&limit=5`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on initial render and page change
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Submission function for adding or updating products
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    if (editingProduct) {
      // Update existing product
      try {
        const response = await axios.put(`https://activant-2-backend-1.onrender.com/api/products/${editingProduct._id}`, {
          productName,
          productId,
          description,
        });

        setProducts(products.map(product => product._id === editingProduct._id ? response.data : product));
        setEditingProduct(null);
        setProductName('');
        setProductId('');
        setDescription('');
      } catch (error) {
        console.error('Error updating product', error);
      } finally {
        setLoading(false); 
      }
    } else {
      // Add new product
      try {
        const response = await axios.post('https://activant-2-backend-1.onrender.com/api/products', {
          productName,
          productId,
          description,
        });

        setProducts([...products, response.data]);
        setProductName('');
        setProductId('');
        setDescription('');
      } catch (error) {
        console.error('Error saving product', error);
      } finally {
        setLoading(false); 
      }
    }
  };

  // Delete product
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`https://activant-2-backend-1.onrender.com/api/products/${productId}`);
        setProducts(products.filter(product => product._id !== productId));
      } catch (error) {
        console.error('Error deleting product', error);
      }
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setProductName(product.productName);
    setProductId(product.productId);
    setDescription(product.description);
    setEditingProduct(product);
  };

  const handleLogout = () => {
navigate('/')
  }

  return (
    <div>
        <div className="header">
        <h1>{editingProduct ? 'Edit Product' : 'Add Product'}</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : editingProduct ? 'Update' : 'Add'}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Products</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Description</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.productId}</td>
                <td>{product.description}</td>
                <td>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(product)} className="edit-btn">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination">
        <button
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button
          disabled={currentPage === totalPages || loading}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products
