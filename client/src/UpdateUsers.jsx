import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const UpdateUsers = () => {
  const {id} =useParams();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [age,setAge]=useState();
  const navigate=useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/getuser/'+id)
      .then(result => {console.log(result)
        setName(result.data.name)
        setEmail(result.data.email)
        setAge(result.data.age)}
        )
      .catch(err => console.log(err))
  },[])
  
  const update = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3001/updateuser/'+id,
      {name,email,age})
      .then(res => console.log(res)
      ,navigate('/'))
      .catch(err => console.log(err))

    };


  return (
    <div className="bg-yellow-200">
    <form onSubmit={update}> 
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
          onChange={ (e) => setName(e.target.value)}
            value={name}
            type="text"            className="form-control"
            placeholder="Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Email</label>
          <input
          onChange={ (e) => setEmail(e.target.value)}
           value={email}
            type="email"
            className="form-control"
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Age</label>
          <input
          onChange={ (e) => setAge(e.target.value)}
            value={age}
            type="number"
            className="form-control"
            placeholder="Age"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          update
        </button>
      </form>
      </div>
  )
}

export default UpdateUsers;