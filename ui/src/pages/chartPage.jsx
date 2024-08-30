import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'chart.js/auto';
import 'react-datepicker/dist/react-datepicker.css';
import { Line } from 'react-chartjs-2';

function ChartPage() {
  const [startDate, setStartDate] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chartData, setChartData] = useState({});

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSelectedDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleValidateStartEndDates = () => {
    if (startDate && endDate && startDate <= endDate) {
      setStep(2); 
    } 
  };

  const handleValidateSelectedDate = () => {
    if (selectedDate && startDate && endDate && selectedDate >= startDate && selectedDate <= endDate) {
      updateChartData();
    }
  };

  const updateChartData = () => {
    const labels = [];
    const values = [];

    const start = new Date(startDate);
    const end = new Date(endDate);
    const selected = new Date(selectedDate);

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
          backgroundColor: 'rgba(75, 192, 192, 0.2)', 
          borderColor: 'rgb(75, 192, 192)', 
          borderWidth: 2,
          fill: false, 
          tension: 0.4, 
          pointRadius: 0, 
        },
      ],
    };

    setChartData(data);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Graphique des Possessions</h2>

      <div className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Date de Début :</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Date de Fin :</label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy/MM/dd"
                className="form-control"
              />
            </div>
          </div>
        </div>
        {step === 1 && (
          <button className="btn btn-primary mt-3" onClick={handleValidateStartEndDates}>
            Valider Dates Début/Fin
          </button>
        )}
      </div>

      {step === 2 && (
        <div className="mb-4">
          <div className="form-group">
            <label>Date Sélectionnée :</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleSelectedDateChange}
              minDate={startDate}
              maxDate={endDate}
              dateFormat="yyyy/MM/dd"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleValidateSelectedDate}>
            Valider Date Sélectionnée
          </button>
        </div>
      )}

      {chartData.labels && (
        <div className="chart-container">
          <Line
            data={chartData}
            options={{
              scales: {
                x: {
                  beginAtZero: true,
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





