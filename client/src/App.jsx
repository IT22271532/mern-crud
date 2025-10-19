import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Users from './Users'
import CreateUsers from './CreateUsers'
import UpdateUsers from './UpdateUsers'


function App() {
 

  return (
    <div>

      <Route path="/" element={<Users/>} />
      <Route path="/createuser" element={<CreateUsers/>} />
      <Route path="/updateuser/:id" element={<UpdateUsers/>} />

    </div>
  )
}

export default App
