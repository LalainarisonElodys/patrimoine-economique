import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import PatrimoinePage from './pages/patrimoinePage';
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
                <Route path="/patrimoine" element={<PatrimoinePage />} />
                <Route path="/possession" element={<PossessionListPage />} />
                <Route path="/possession/create" element={<CreatePossessionPage />} />
                <Route path="/possession/:libelle/update" element={<UpdatePossessionPage />} />
            </Routes>
        </Router>
    );
};

export default App;
