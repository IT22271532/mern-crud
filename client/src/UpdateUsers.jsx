import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './components/LoadingSpinner'


const UpdateUsers = () => {
  const {id} =useParams();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [age,setAge]=useState();
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/getuser/'+id)
      .then(result => {
        console.log(result)
        setName(result.data.name)
        setEmail(result.data.email)
        setAge(result.data.age)
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  },[id])
  
  const update = (e) => {
    e.preventDefault()
    setUpdateLoading(true);
    axios.put('http://localhost:3001/updateuser/'+id,
      {name,email,age})
      .then(res => {
        console.log(res);
        setUpdateLoading(false);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setUpdateLoading(false);
      })
  };


  return (
    <div className="container mt-4">
      <h2>Update User</h2>
      
      {loading ? (
        <LoadingSpinner size="large" message="Loading user data..." />
      ) : (
        <form onSubmit={update}> 
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              onChange={ (e) => setName(e.target.value)}
              value={name || ''}
              type="text"
              className="form-control"
              placeholder="Name"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              onChange={ (e) => setEmail(e.target.value)}
              value={email || ''}
              type="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="age">Age</label>
            <input
              onChange={ (e) => setAge(e.target.value)}
              value={age || ''}
              type="number"
              className="form-control"
              placeholder="Age"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={updateLoading}
          >
            {updateLoading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                Updating...
              </>
            ) : (
              'Update'
            )}
          </button>
        </form>
      )}
      
      {updateLoading && (
        <div className="mt-4">
          <LoadingSpinner size="medium" message="Updating user..." />
        </div>
      )}
    </div>
  )
}

export default UpdateUsers;