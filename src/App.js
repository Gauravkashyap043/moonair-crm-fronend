import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Test from './pages/test/Test';
// import ComplianForm from './pages/ComplainForm/ComplianForm';
import Register from './pages/Register/Register';
import ComplianForm from './components/ComplainForm/ComplianForm';
import Admin from './pages/Admin/Admin';
import Service from './pages/Service/Service';
import { ToastContainer } from 'react-toastify';

function App() {
  

  return (
    <div>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/test" element={<Test/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/service" element={<Service/>} />
      {/* <Route path="/service/complain-form" element={<ComplianForm/>} /> */}
      {/* <Route path="admin/" element={<h1>this is dashboard</h1>} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;



