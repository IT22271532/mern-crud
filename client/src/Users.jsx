import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from './components/LoadingSpinner'
import ConfirmationModal from './components/ConfirmationModal'
import ThemeToggle from './components/ThemeToggle'
import Pagination from './components/Pagination'
import { useToast } from './context/ToastContext'

const Users = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Search/Filter state
  const [searchTerm, setSearchTerm] = useState('');
  
  const { showSuccess, showError } = useToast();

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.age.toString().includes(searchTerm)
  );

  // Calculate pagination values
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001')
      .then(result => {
        setUser(result.data);
        setLoading(false);
        showSuccess('Users loaded successfully!');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        showError('Failed to load users. Please try again.');
      })
  },[showSuccess, showError])

  // Reset to page 1 if current page exceeds total pages after data changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [users, currentPage, totalPages]);

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  }

  const handleDelete = () => {
    if (!userToDelete) return;
    
    setDeleteLoading(true);
    axios.delete(`http://localhost:3001/deleteuser/${userToDelete._id}`)
    .then(result => {
      setUser(result.data);
      setDeleteLoading(false);
      closeDeleteModal();
      showSuccess(`User "${userToDelete.name}" has been deleted successfully!`);
    })
    .catch(err => {
      console.log(err);
      setDeleteLoading(false);
      closeDeleteModal();
      showError('Failed to delete user. Please try again.');
    })
  }


  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>User Management</h2>
          <p className="mb-0">Manage your users efficiently</p>
        </div>
        <ThemeToggle />
      </div>
      
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
        <Link to="/createuser" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Add User
        </Link>
        
        <div className="d-flex align-items-center gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 when searching
            }}
            style={{ minWidth: '200px' }}
          />
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              aria-label="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
      
      {loading ? (
        <LoadingSpinner size="large" message="Loading users..." />
      ) : (
        <>
          {searchTerm && (
            <div className="alert alert-info d-flex align-items-center mb-3">
              <i className="fas fa-search me-2"></i>
              <span>
                {totalItems > 0 
                  ? `Found ${totalItems} user${totalItems !== 1 ? 's' : ''} matching "${searchTerm}"`
                  : `No users found matching "${searchTerm}"`
                }
              </span>
            </div>
          )}
          
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => {
                  return <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <Link to={`/updateuser/${user._id}`} className="btn btn-success me-2">
                        Update
                      </Link>
                      <button 
                        className="btn btn-danger"
                        onClick={() => openDeleteModal(user)}
                        disabled={deleteLoading}
                      >
                        {deleteLoading && userToDelete?._id === user._id ? (
                          <>
                            <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                            Deleting...
                          </>
                        ) : (
                          'Delete'
                        )}
                      </button>
                    </td>
                  </tr>
                })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    <div className="text-muted">
                      <i className="fas fa-users mb-2" style={{ fontSize: '2rem', opacity: 0.5 }}></i>
                      <p className="mb-0">No users found</p>
                      <small>Add some users to get started</small>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
      
      {/* Pagination Component */}
      {!loading && totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          showItemsPerPage={true}
          showInfo={true}
          itemsPerPageOptions={[5, 10, 20, 50]}
        />
      )}

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  )
}

export default Users