import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './components/LoadingSpinner'

const CreateUsers = () => {
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [age,setAge]=useState();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const submit = (e) => {
    e.preventDefault()
    setLoading(true);
    axios.post('http://localhost:3001/createuser',
      {name,email,age})
      .then(res => {
        console.log(res);
        setLoading(false);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  return (
    <div className="container mt-4">
      <h2>Create New User</h2>
      <form onSubmit={submit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            onChange={ (e) => setName(e.target.value)}
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
            type="number"
            className="form-control"
            placeholder="Age"
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="spinner-border spinner-border-sm me-2" role="status"></div>
              Creating...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
      
      {loading && (
        <div className="mt-4">
          <LoadingSpinner size="medium" message="Creating user..." />
        </div>
      )}
    </div>
  );
};

export default CreateUsers;
