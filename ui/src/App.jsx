import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import ChartPage from './pages/chartPage';
import PatrimoinePage from './pages/PatrimoinePage';
import PossessionListPage from './pages/possessionList';
import CreatePossessionPage from './pages/createPossession';
import UpdatePossessionPage from './pages/updatePossession';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <Router>
            <Header />
            <br />
            <br />
            <br />
            <br />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/possession" element={<PossessionListPage />} />
                <Route path="/patrimoine" element={<PatrimoinePage />} />
                <Route path="/possession/create" element={<CreatePossessionPage />} />
                <Route path="/possession/:libelle/update" element={<UpdatePossessionPage />} />
                <Route path="/chart" element={<ChartPage />} />
            </Routes>
        </Router>
    );
};

export default App;



