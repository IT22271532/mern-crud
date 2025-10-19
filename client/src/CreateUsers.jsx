import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const CreateUsers = () => {
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [age,setAge]=useState();
  const navigate=useNavigate();

  const submit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/createuser',
      {name,email,age})
      .then(res => console.log(res),navigate('/'))
      .catch(err => console.log(err))
  }

  return (
    <>
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            onChange={ (e) => setName(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Email</label>
          <input
            onChange={ (e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Age</label>
          <input
            onChange={ (e) => setAge(e.target.value)}
            type="number"
            className="form-control"
            placeholder="Age"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateUsers;
