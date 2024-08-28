import React, { useState } from 'react';
import { getValeurPatrimoine, getValeurPatrimoineRange } from '../services/patrimoineService';
import { Line } from 'react-chartjs-2';

const PatrimoinePage = () => {
    const [date, setDate] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [jour, setJour] = useState(1);
    const [patrimoineValue, setPatrimoineValue] = useState(null);
    const [rangeData, setRangeData] = useState([]);

    const handleGetValeurPatrimoine = async () => {
        const response = await getValeurPatrimoine(date);
        setPatrimoineValue(response.data.valeur);
    };

    const handleGetValeurPatrimoineRange = async () => {
        const response = await getValeurPatrimoineRange({ type: 'month', dateDebut, dateFin, jour });
        setRangeData(response.data);
    };

    const chartData = {
        labels: rangeData.map(data => data.date),
        datasets: [
            {
                label: 'Valeur Patrimoine',
                data: rangeData.map(data => data.valeur),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    return (
        <div>
            <h2>Page Patrimoine</h2>
            <div>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <button onClick={handleGetValeurPatrimoine}>Valider</button>
                {patrimoineValue && <p>Valeur du Patrimoine à la date {date}: {patrimoineValue}</p>}
            </div>
            <div>
                <h3>Plage de dates</h3>
                <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                <input type="number" value={jour} onChange={(e) => setJour(e.target.value)} />
                <button onClick={handleGetValeurPatrimoineRange}>Valider Plage</button>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default PatrimoinePage;
