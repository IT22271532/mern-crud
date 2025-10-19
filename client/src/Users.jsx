import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoadingSpinner from './components/LoadingSpinner'
import ConfirmationModal from './components/ConfirmationModal'

const Users = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001')
      .then(result => {
        setUser(result.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  },[])

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
      // Instead of window.location.reload(), we update the state
    })
    .catch(err => {
      console.log(err);
      setDeleteLoading(false);
      closeDeleteModal();
    })
  }


  return (
    <div className="container">
      <h2>Users Data is displaying and also this is the testing purpose change onsasasalysasass</h2>
      <p>Users Data Displaying</p>
      <Link to="/createuser" className="btn btn-warning">Add+</Link>
      
      {loading ? (
        <LoadingSpinner size="large" message="Loading users..." />
      ) : (
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
            {
              users.map((user) => {
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
            }
          </tbody>
        </table>
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