
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function ChartPage() {
  const [dateDebut, setdateDebut] = useState(null);
  const [step, setStep] = useState(1); 
  const [DateGraphe, setDateGraphe] = useState({});
  const [dateFin, setdateFin] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handledateDebutChange = (date) => {
    setdateDebut(date);
  };

  const handledateFinChange = (date) => {
    setdateFin(date);
  };

  const handleSelectedDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleValidationDate = () => {
    if (dateDebut && dateFin && dateDebut <= dateFin) {
      setStep(2); 
    }
  };

  const handleValidateSelectedDate = () => {
    if (selectedDate && dateDebut && dateFin && selectedDate >= dateDebut && selectedDate <= dateFin) {
      updateDateGraphe();
    }
  };

  const updateDateGraphe = () => {
    const labels = [];
    const valeurs = [];

    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const selected = new Date(selectedDate);

    const dateEntreDebutFin = (fin - debut) / (1000 * 60 * 60 * 24);
    const dateSelectionner = (selected - debut) / (1000 * 60 * 60 * 24);

    for (let i = 0; i <= dateEntreDebutFin; i++) {
      const currentDate = new Date(debut);
      currentDate.setDate(debut.getDate() + i);
      labels.push(currentDate.toISOString().split('T')[0]); 

      
      let value;
      if (i <= dateSelectionner) {
        value = 10 + i * 2;
      } else {
        value = 10 + dateSelectionner * 3 - (i - dateSelectionner) * 2; 
      }

      valeurs.push(value);
    }

    const data = {
      labels: labels,
      datasets: [
        {
          data: valeurs, label: 'Possession',backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgb(75, 192, 192)', 
          borderWidth: 1,fill: false, tension: 0.5, pointRadius: 0.1, 
        },
      ],
    };

    setDateGraphe(data);
  };

  return (
    <Container>
      <h4 className='text-decoration-underline mt-5 '>Afficher la graphe</h4>
      <Container className='bg-light p-2 mt-4 border'>
        <Row className='mt-3 '>
          <Col md={5}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Entrer la date du début:</Form.Label>
                <div className="d-flex justify-content-between align-items-center">
                  <DatePicker selected={dateDebut} onChange={handledateDebutChange} selectsStart dateDebut={dateDebut}
                    dateFin={dateFin} dateFormat="dd/MM/yyyy" className="form-control me-2" placeholderText='entrer'
                  />
                </div>
              </Form.Group>
            </Form>
          </Col>
          <Col md={5}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Entrer la date fin:</Form.Label>
                <div className="d-flex justify-content-between align-items-center">
                  <DatePicker selected={dateFin} onChange={handledateFinChange} selectsEnd dateDebut={dateDebut} dateFin={dateFin}
                  minDate={dateDebut} dateFormat="dd/MM/yyyy" className="form-control me-2" placeholderText='entrer'
                  />
                </div>
              </Form.Group>
            </Form>
          </Col>
          <Col md={2}>
          {step === 1 && (
            <Button variant="outline-success" className='mt-4' onClick={handleValidationDate}>Valider les dates</Button>
          )}
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            {step === 2 && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Sélectionner la date :</Form.Label>
                  <div className="d-flex justify-content-between align-items-center">
                    <DatePicker selected={selectedDate} onChange={handleSelectedDateChange} minDate={dateDebut} maxDate={dateFin}
                      dateFormat="dd/MM/yyyy"  className="form-control me-2" placeholderText='entrer'
                    />
                    <Button variant="outline-success" onClick={handleValidateSelectedDate}>Valider la date</Button>
                  </div>
                </Form.Group>
              </Form> 
            )}
          </Col>
        </Row>
      </Container>
      <Row className='mt-5 col-md-10 justify-content-center'>
        {DateGraphe.labels && (
          <div className="chart-container">
            <Line
              data={DateGraphe}
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
      </Row>
    </Container>

    
  );
}

export default ChartPage;

