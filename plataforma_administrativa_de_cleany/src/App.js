import React from 'react';
import DataTableDemo from './Components/DataTable/DataTable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/data" element={<DataTableDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
