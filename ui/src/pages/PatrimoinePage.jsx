import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Possession from '../../../models/possessions/Possession';
import ChartPage from './chartPage';


function PatrimoinePage() {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalValeurActuelle, setTotalValeurActuelle] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/patrimoine')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        const possessionsData = data.data.possessions[0].data.possessions;

        const loadedPossessions = possessionsData.map(possession =>
          new Possession(
            possession.possesseur.nom,
            possession.libelle,
            possession.valeur,
            new Date(possession.dateDebut),
            possession.dateFin ? new Date(possession.dateFin) : null,
            possession.tauxAmortissement || 0,
            possession.valeurConstante || 0
          )
        );

        setPossessions(loadedPossessions);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données:', error);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDate) {
      const updatedPossessions = possessions.map(possession => {
        return new Possession(
          possession.possesseur,
          possession.libelle,
          possession.valeur,
          possession.dateDebut,
          selectedDate,
          possession.tauxAmortissement,
          possession.valeurConstante
        )
      });

      const totalPatrimoine = updatedPossessions.reduce((sum, possession) => {
        return sum + possession.getValeur(selectedDate);
      }, 0);
      console.log('Valeur totale du patrimoine:', totalPatrimoine);

      setPossessions(updatedPossessions);
      setTotalValeurActuelle(totalPatrimoine);
    }
  };


  return (
    <Container>
      <h1 className='text-primary text-center mb-5'>A propos du Patrimoine</h1>
      <Row className=' mb-5 '>
        <h4 className='text-decoration-underline mb-5 '>Calculer la valeur total du patrimoine</h4>
        <Col md={5} className="bg-light p-4 border">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Sélectionner une date :</Form.Label>
              <div className="d-flex justify-content-between align-items-center">
                <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" className="form-control me-2"
                />
                <Button variant="outline-success" onClick={handleSubmit}>Valider</Button>
              </div>
            </Form.Group>
          </Form>
        </Col>
        <Col md={7} >
          <h4 className='mt-5 border p-4 bg-info' >La valeur de la patrimoine est: {totalValeurActuelle} Ar</h4>
        </Col>
      </Row>

      
      <ChartPage />
      
    </Container>
  );
}

export default PatrimoinePage;
