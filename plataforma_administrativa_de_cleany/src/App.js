import React from 'react';
import DataTableDemo from './Components/DataTable/DataTable';
import DetailRegister from './Components/DataTable/DetailDashboard/DetailRegister';
import Dashboard from './Components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/data" element={<DataTableDemo />} />
        <Route path="/datatable/detail" element={<DetailRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
