

import React, { useEffect, useState } from 'react';
import Possession from '../../../models/possessions/Possession';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Form, Table } from 'react-bootstrap';


const PossessionListPage = () => {
    const [possessions, setPossessions] = useState([]);
    const [totalValeurActuelle, setTotalValeurActuelle] = useState(0);
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        fetch('http://localhost:5000/api/patrimoine')
            .then(response => {
            if (!response.ok) {
              throw new Error('Erreur réseau');
            }
            return response.json();
            })
            .then(data => {
            const Data = data.data.possessions[0].data.possessions;
    
            const poss = Data.map(possession =>
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
    
            setPossessions(poss);
            })
            .catch(error => {
            console.error('Erreur lors du chargement des données:', error);
          });
    }, []);
    
    const handleDate = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = () => {
        if (selectedDate) {
            const updatePoss = possessions.map(possession => {
            return new Possession(
            possession.possesseur,
            possession.libelle,
            possession.valeur,
            possession.dateDebut,
            selectedDate,
            possession.tauxAmortissement,
            possession.valeurConstante
            );
        });
    
        const calculTotal = updatePoss.reduce((sum, possession) => {
            return sum + possession.getValeur(selectedDate);
        }, 0);
    
          setPossessions(updatePoss);
          setTotalValeurActuelle(calculTotal);
        }
    };

    const getInitValue= (possession) => {
        return possession.valeur === 0 ? possession.valeurConstante : possession.valeur;
      };
    
      const closePossession = (libelle) => {
        fetch(`/possession/${libelle}/close`, { method: 'PUT' })
          .then(() => setPossessions(possessions.filter(p => p.libelle !== libelle)))
          .catch(error => console.error('Erreur lors de la fermeture de la possession:', error));
      };

    return (
        <div>
            <h2 className='text-center mt-3 text-primary'>Liste des Possessions</h2>
            
            <Table bordered border={4} className="mt-5 container">
                <thead>
                    <tr className="text-center">
                        <th>Possesseur</th>
                        <th>Libelle</th>
                        <th>Valeur initiale</th>
                        <th>Valeur actuelle</th>
                        <th>Date Début</th>
                        <th>Date Fin</th>
                        <th>Taux Ammortissement</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {possessions.length === 0 ? (
                    <tr>
                    <td colSpan="8">Aucune possession à afficher</td>
                    </tr>
                    ) : (
                        possessions.map((item, index) => (
                            <tr key={index}>
                                <td>{item.possesseur}</td>
                                <td>{item.libelle}</td>
                                <td>{getInitValue(item).toFixed(2)}</td>
                                <td>{item.getValeur(selectedDate).toFixed(2)}</td>
                                <td>{new Date(item.dateDebut).toLocaleDateString()}</td>
                                <td>{item.dateFin ? new Date(item.dateFin).toLocaleDateString() : 'Non définie'}</td>
                                <td>{item.tauxAmortissement} %</td>
                                <td>
                                    <button className="btn btn-info p-1 m-1" onClick={() => navigate(`/possession/${item.libelle}/update`)}>Edit</button>
                                    <button className="btn btn-danger p-1 m-1" onClick={() => closePossession(item.libelle)}>Close</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
            <Form className='m-3 border text-center'>
            <div>
                <div class="d-flex justify-content-evenly align-items-center">
                    <label className="col-sm-4 control-label ">Veiller entrer la date: </label>
                    <div className="col-sm-4">
                       <DatePicker selected={selectedDate} className='form-control' onChange={handleDate} dateFormat="dd/MM/yyyy"/>
                    </div>
                </div>
                <button className='btn btn-success m-3 mb-5' onClick={handleSubmit}>Valider</button>
                {<p>La valeur du Patrimoine est : {totalValeurActuelle}</p>}
            </div>
            </Form>

            
            
        </div>
        
    );
};

export default PossessionListPage;


