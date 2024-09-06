import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Possession from '../../../models/possessions/Possession';

function PossessionPage() {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/patrimoine`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        const possessionsData = data.data.possessions[0].data.possessions;

        const loadPoss = possessionsData.map(possession =>
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

        setPossessions(loadPoss);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données:', error);
      });
  }, []);

  const getValeurInitiale = (possession) => {
    return possession.valeur === 0 ? possession.valeurConstante : possession.valeur;
  };

  const closePossession = (libelle) => {
    fetch(`${process.env.REACT_APP_API_URL}/possession/${libelle}/close`, { method: 'PUT' })
      .then(() => setPossessions(possessions.filter(p => p.libelle !== libelle)))
      .catch(error => console.error('Erreur lors de la fermeture de la possession:', error));
  };
  return (
    <Container className="mt-3">
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h1 className='text-primary'>Listes des possessions</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={20}>
          <Table  bordered border={4} className="mt-3 container">
            <thead>
              <tr className="text-center">
                <th>Libelle</th>
                <th>Valeur Initiale</th>
                <th>Valeur Actuelle</th>
                <th>Date de Début</th>
                <th>Date de Fin</th>
                <th>Taux d'Amortissement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {possessions.length === 0 ? (
                <tr>
                  <td colSpan="8">Il n'y a pas de possession</td>
                </tr>
              ) : (
                possessions.map((item, index) => (
                  <tr key={index}>
                      <td>{item.libelle}</td>
                      <td>{getValeurInitiale(item)} Ar</td>
                      <td>{item.getValeur(selectedDate)} Ar</td>
                      <td>{new Date(item.dateDebut).toLocaleDateString()}</td>
                      <td>{item.dateFin ? new Date(item.dateFin).toLocaleDateString() : 'En cours'}</td>
                      <td>{item.tauxAmortissement} %</td>
                      <td className='d-flex justify-content-between'>
                          <Button variant='outline-warning' onClick={() => navigate(`${process.env.REACT_APP_API_URL}/possession/${libelle}/close`)}>Modifier</Button>
                          <Button variant="outline-danger" onClick={() => closePossession(item.libelle)}>Clôturer</Button>
                      </td>
                  </tr>
              ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
      <Link to={`/possession/create`} className="btn btn-primary me-2 col-sm-2 mb-5 mt-4">Créer une possession</Link>
      </Row>
    </Container>
  );
}

export default PossessionPage;

