import React, { useState, useEffect } from 'react';
import { updatePossession, getPossessions } from '../services/possessionService';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePossessionPage = () => {
    const { libelle } = useParams();
    const [dateFin, setDateFin] = useState('');
    const navigate = useNavigate();
    const [currentPossession, setCurrentPossession] = useState(null);

    useEffect(() => {
        const fetchPossession = async () => {
            const response = await getPossessions();
            const possession = response.data.find(p => p.libelle === libelle);
            setCurrentPossession(possession);
        };
        fetchPossession();
    }, [libelle]);

    const handleUpdatePossession = async () => {
        await updatePossession(libelle, { dateFin });
        navigate('/possession');
    };

    return (
        <div>
            <h2>Mettre à Jour la Possession</h2>
            {currentPossession && (
                <>
                    <p>Libelle: {currentPossession.libelle}</p>
                    <p>Date Début: {currentPossession.dateDebut}</p>
                    <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                    <button onClick={handleUpdatePossession}>Mettre à Jour</button>
                </>
            )}
        </div>
    );
};

export default UpdatePossessionPage;
