import React, { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';
import { DatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


const Patrimoine = () => {
    const [dateDebut, setDateDebut] = useState(null);
    const [dateFin, setDateFin] = useState(null);
    const [jour, setJour] = useState('');
    const [data, setData] = useState(null);


    const handleValidate = async () => {
        const response = await axios.post('http://localhost:5000/patrimoine/range', { type: 'month', dateDebut, dateFin, jour });
        setData(response.data);
    };

    return (
        <div>
            <h1>Patrimoine</h1>
            <DatePicker selected={dateDebut} onChange={date => setDateDebut(date)} />
            <DatePicker selected={dateFin} onChange={date => setDateFin(date)} />
            <input type="text" value={jour} onChange={e => setJour(e.target.value)} placeholder="Jour" />
            <button onClick={handleValidate}>Validate</button>
            {data && <Line data={data} />}
        </div>
    );
};

export default Patrimoine;


/*
DatePicker
Link
axios
cors
body-Parser
*/

