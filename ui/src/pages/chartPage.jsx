import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js/auto';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';

function ChartPage() {
  const [dateDebut, setDateDebut] = useState(null);
  const [step, setStep] = useState(1);
  const [choosenDate, setChoosenDate] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [dateGraphe, setDateGraphe] = useState({});

  const handleDateDebut = (date) => {
    setDateDebut(date);
  };

  const handleDateFin = (date) => {
    setDateFin(date);
  };

  const handleChoosenDate = (date) => {
    setChoosenDate(date);
  };

  const handleValidation = () => {
    if (dateDebut && dateFin && dateDebut <= dateFin) {
      setStep(2); 
    } 
  };

  const handleValidateSelectedDate = () => {
    if (choosenDate && dateDebut && dateFin && choosenDate >= dateDebut && choosenDate <= dateFin) {
      updateChartData();
    }
  };

  const updateChartData = () => {
    const labels = [];
    const values = [];

    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const selected = new Date(choosenDate);

    const daysBetween = (end - start) / (1000 * 60 * 60 * 24);
    const selectedDayIndex = (selected - start) / (1000 * 60 * 60 * 24);

    for (let i = 0; i <= daysBetween; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      labels.push(currentDate.toISOString().split('T')[0]);

      let value;
      if (i <= selectedDayIndex) {
        value = 10 + i * 3; 
      } else {
        value = 10 + selectedDayIndex * 3 - (i - selectedDayIndex) * 2; 
      }

      values.push(value);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Valeur des Possessions',
          data: values,
          backgroundColor: '#945bfc', 
          borderColor: '#80cdd6e0', 
          borderWidth: 2,
          fill: false, 
          tension: 0.4, 
          pointRadius: 0, 
        },
      ],
    };

    setDateGraphe(data);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">Le Graphique</h2>

      <div className="mb-4">
        <div className="row">
          <div className="col-sm-4">
            <div className="form-group">
              <label>Date Début :</label>
              <DatePicker selected={dateDebut} onChange={handleDateDebut} selectsStart dateDebut={dateDebut}
                dateFin={dateFin} dateFormat="dd/MM/yyyy" className="form-control"
            />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Date Fin :</label>
              <DatePicker selected={dateFin} selectsEnd minDate={dateDebut} onChange={handleDateFin}
                dateDebut={dateDebut} dateFin={dateFin} className="form-control" dateFormat="dd/MM/yyyy"
             />
            </div>
          </div>
            <div>
            {step === 1 && (
            <button className="btn btn-success mt-3 col-sm-2" onClick={handleValidation}>
                Définir le jour
            </button>
            )}
            </div>
        </div>

      </div>

      {step === 2 && (
        <div className="mb-4">
          <div className="form-group">
            <label>Selectionner:</label>
            <DatePicker selected={choosenDate} onChange={handleChoosenDate} minDate={dateDebut} maxDate={dateFin}
              dateFormat="dd/MM/yyyy" className="form-control"  
            />
          </div>
          <button className="btn btn-success mt-3" onClick={handleValidateSelectedDate}>
            Valider 
          </button>
        </div>
      )}

      {dateGraphe.labels && (
        <div className="chart-container">
          <Line
            data={dateGraphe}
            options={{
              scales: {
                x: {
                  beginAtZero: false,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ChartPage;

