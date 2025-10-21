import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Users from './Users'
import CreateUsers from './CreateUsers'
import UpdateUsers from './UpdateUsers'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider } from './context/ThemeContext'


function App() {
 

  return (
    <ThemeProvider>
      <ToastProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Users/>} />
              <Route path="/createuser" element={<CreateUsers/>} />
              <Route path="/updateuser/:id" element={<UpdateUsers/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
