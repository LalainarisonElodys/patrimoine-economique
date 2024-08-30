import React, { useState, useEffect } from 'react';
import { updatePossession, getPossessions } from '../services/possessionService';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePossessionPage = () => {
    const { libelle } = useParams();
    const [dateDebut, setDateDebut] = useState(new Date());
    const [dateFin, setDateFin] = useState(null);
    const [currentPossession, setCurrentPossession] = useState(null);
    const navigate = useNavigate();
    const [possesseur, setPossesseur] = useState('');
    const [lib, setLib] = useState('');
    const [taux, setTaux] = useState('');
    const [valeur, setValeur] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/possession/${libelle}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur du réseau');
            }
            return response.json();
          })
          .then(data => {
            setPossesseur(data.possesseur.nom);
            setLib(data.lib);
            setValeur(data.valeur);
            setDateDebut(new Date(data.dateDebut));
            setDateFin(data.dateFin ? new Date(data.dateFin) : null);
            setTauxAmortissement(data.tauxAmortissement || '');
          })
          .catch(error => {
            console.error('Erreur lors du chargement des données:', error);
          });
      }, [libelle]);

      const handleUpdatePossession = (event) => {
        event.preventDefault();

        const updatePoss = {
            possesseur,
            libelle: libelleState,
            valeur: parseFloat(valeur),
            dateDebut: dateDebut.toISOString().split('T')[0],
            dateFin: dateFin ? dateFin.toISOString().split('T')[0] : null,
            tauxAmortissement: parseFloat(tauxAmortissement),
          };
      
          fetch(`http://localhost:5000/possession/${libelle}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPoss),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Erreur du réseau');
              }
              return response.json();
            })
            .then(() => {
              navigate('/');
            })
            .catch(error => {
              console.error('Erreur lors de la mise à jour de la possession:', error);
            });

    };

    return (
        <div>
            <h2 className='m-3 text-center text-primary'>Mettre à jour la Possession</h2>
            <Form  onSubmit={handleUpdatePossession}>
                <div class="form row mt-3 mb-3">
                    <label className="col-sm-2 control-label">Possesseur: </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="text" placeholder="possesseur" value={possesseur} onChange={(e) => setPossesseur(e.target.value)} />    
                    </div>
                </div>
                <div class="form row mt-3 mb-3">
                    <label className="col-sm-2 control-label">Entrer libelle : </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="text" placeholder="Libelle" value={lib} onChange={(e) => setLib(e.target.value)} />    
                    </div>
                </div>
                <div className="form row mb-3">
                    <label className="col-sm-2 control-label">La valeur initiale : </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="number" placeholder="Valeur" value={valeur} onChange={(e) => setValeur(e.target.value)} /> 
                    </div>
                </div>
                <div className="form row mb-3">
                    <label className="col-sm-2 control-label">Veiller entrer la date : </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} />
                    </div>
                </div>
                <div className="form row mb-3">
                    <label className="col-sm-2 control-label">Le taux d'ammortissement : </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="number" placeholder="Taux" value={taux} onChange={(e) => setTaux(e.target.value)} />
                    </div>
                </div>
                
                <br />
                <button className='btn btn-success m-5' type='submit'>Modifier</button>
            </Form>
        </div>
    );
    
};

export default UpdatePossessionPage;
