

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import ChartPage from './pages/chartPage';
import PossessionListPage from './pages/possessionList';
import CreatePossessionPage from './pages/createPossession';
import UpdatePossessionPage from './pages/updatePossession';

const App = () => {
    return (
        <Router>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <Routes>
                <Route path="/" element={<PossessionListPage />} />
                <Route path="/possession/create" element={<CreatePossessionPage />} />
                <Route path="/possession/:libelle/update" element={<UpdatePossessionPage />} />
                <Route path="/chart" element={<ChartPage />} />
            </Routes>
        </Router>
    );
};

export default App;



