import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import EditEmployee from './pages/EditEmployee';
import DeleteEmployee from './pages/DeleteEmployee';
import AddEmployee from './pages/AddEmployee';

const App = () => {
  return (
<BrowserRouter>
    <div className="d-flex vh-100">
      <Sidebar />
    <div className="flex-grow-1 d-flex flex-column">
      <Header />
          <Routes>
            <Route path='/' element={<EmployeeList /> } />
            <Route path='/employeedetails/:id' element={<EmployeeDetails /> } />
            <Route path='/addemployee' element={<AddEmployee /> } />
            <Route path='/editemployee/:id' element={<EditEmployee /> } />
            <Route path='/deleteemployee/:id' element={<DeleteEmployee /> } />
            <Route path='*' element={<EmployeeList />} />
          </Routes>
    </div>
   </div>
</BrowserRouter>
  )
}

export default App