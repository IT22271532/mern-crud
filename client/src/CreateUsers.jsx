import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import LoadingSpinner from './components/LoadingSpinner'
import FormInput from './components/FormInput'
import ThemeToggle from './components/ThemeToggle'
import { validateForm } from './utils/validation'
import { useToast } from './context/ToastContext'

const CreateUsers = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [age,setAge]=useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate=useNavigate();
  const { showSuccess, showError } = useToast();

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

  const submit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, age: true });
    
    // Validate form
    const validation = validateForm({ name, email, age });
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      return;
    }
    
    setLoading(true);
    axios.post('http://localhost:3001/createuser',
      {name: name.trim(), email: email.trim(), age: parseInt(age)})
      .then(res => {
        console.log(res);
        setLoading(false);
        showSuccess(`User "${name.trim()}" has been created successfully!`);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        // Handle server errors
        if (err.response && err.response.data && err.response.data.message) {
          setErrors({ server: [err.response.data.message] });
          showError(err.response.data.message);
        } else {
          const errorMsg = 'An error occurred while creating the user';
          setErrors({ server: [errorMsg] });
          showError(errorMsg);
        }
      })
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Create New User</h2>
        <ThemeToggle />
      </div>
      
      {errors.server && (
        <div className="alert alert-danger" role="alert">
          {errors.server.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
      
      <form onSubmit={submit}>
        <FormInput
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          placeholder="Enter your name"
          required={true}
          errors={touched.name ? errors.name : []}
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
        />

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
            'Create User'
          )}
        </button>
        
        <button 
          type="button" 
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/')}
          disabled={loading}
        >
          Cancel
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
