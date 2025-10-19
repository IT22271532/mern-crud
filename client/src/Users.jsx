// import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Users = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001')
      .then(result => setUser(result.data))
      .catch(err => console.log(err))
  },[])


  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/deleteuser/${id}`)
    .then(result => setUser(result.data),
     window.location.reload())
    .catch(err => console.log(err))
  }


  return (
    <div className="container">
      <h2>Users Data is displaying and also this is the testing purpose change onsasasalysasass</h2>
      <p>Users Data Displaying</p>
      <Link to="/createuser" className="btn btn-warning">Add+</Link>
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
                <td><Link to={`/updateuser/${user._id}`} className="btn btn-success">Update</Link>
                <button className="btn btn-success"
                onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users