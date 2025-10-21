import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './components/LoadingSpinner'
import FormInput from './components/FormInput'
import ThemeToggle from './components/ThemeToggle'
import { validateForm } from './utils/validation'
import { useToast } from './context/ToastContext'


const UpdateUsers = () => {
  const {id} =useParams();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [age,setAge]=useState('');
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate=useNavigate();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3001/getuser/'+id)
      .then(result => {
        console.log(result)
        setName(result.data.name || '');
        setEmail(result.data.email || '');
        setAge(result.data.age?.toString() || '');
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        const errorMsg = 'Failed to load user data';
        setErrors({ server: [errorMsg] });
        showError(errorMsg);
      })
  },[id, showError])

  const handleFieldChange = (field, value) => {
    // Update the field value
    if (field === 'name') setName(value);
    if (field === 'email') setEmail(value);
    if (field === 'age') setAge(value);

    // Mark field as touched
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate the form and update errors
    const formData = {
      name: field === 'name' ? value : name,
      email: field === 'email' ? value : email,
      age: field === 'age' ? value : age
    };
    
    const validation = validateForm(formData);
    setErrors(validation.errors);
  };
  
  const update = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, age: true });
    
    // Validate form
    const validation = validateForm({ name, email, age });
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      return;
    }
    
    setUpdateLoading(true);
    axios.put('http://localhost:3001/updateuser/'+id,
      {name: name.trim(), email: email.trim(), age: parseInt(age)})
      .then(res => {
        console.log(res);
        setUpdateLoading(false);
        showSuccess(`User "${name.trim()}" has been updated successfully!`);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setUpdateLoading(false);
        // Handle server errors
        if (err.response && err.response.data && err.response.data.message) {
          setErrors({ server: [err.response.data.message] });
          showError(err.response.data.message);
        } else {
          const errorMsg = 'An error occurred while updating the user';
          setErrors({ server: [errorMsg] });
          showError(errorMsg);
        }
      })
  };


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Update User</h2>
        <ThemeToggle />
      </div>
      
      {errors.server && (
        <div className="alert alert-danger" role="alert">
          {errors.server.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      
      {loading ? (
        <LoadingSpinner size="large" message="Loading user data..." />
      ) : (
        <form onSubmit={update}> 
          <FormInput
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Enter your name"
            required={true}
            errors={touched.name ? errors.name : []}
            disabled={updateLoading}
          />

          <FormInput
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="Enter your email"
            required={true}
            errors={touched.email ? errors.email : []}
            disabled={updateLoading}
          />

          <FormInput
            label="Age"
            type="number"
            name="age"
            value={age}
            onChange={(e) => handleFieldChange('age', e.target.value)}
            placeholder="Enter your age"
            required={true}
            errors={touched.age ? errors.age : []}
            disabled={updateLoading}
          />

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
              'Update User'
            )}
          </button>
          
          <button 
            type="button" 
            className="btn btn-secondary ms-2"
            onClick={() => navigate('/')}
            disabled={updateLoading}
          >
            Cancel
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