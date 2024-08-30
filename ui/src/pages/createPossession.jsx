import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const CreatePossessionPage = () => {
    const [possesseur, setPossesseur] = useState('');
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState(0);
    const [dateDebut, setDateDebut] = useState(new Date());
    const [taux, setTaux] = useState('');
    const [valeurConstante, setValeurConstante] = useState('');
    const navigate = useNavigate();

    const handleCreatePossession = (e) => {
        e.preventDefault();
        const nouvellePoss = {
            possesseur,
            libelle,
            valeur: parseFloat(valeur),
            dateDebut,
            taux: parseFloat(taux),
            valeurConstante: parseFloat(valeurConstante),
          };

          
    fetch('http://localhost:5000/possession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nouvellePoss),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('On a rencontrer une erreur');
          }
          return response.json();
        })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('Erreur when possession add', error);
        });
    };
    

    return (
        <div className='m-5'>
            <h2 className='text-center mt-3 text-primary mb-5'>Créer une Possession</h2>
            <Form  onSubmit={handleCreatePossession}>
                <div class="form row mt-3 mb-3">
                    <label className="col-sm-2 control-label">Possesseur: </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="text" placeholder="possesseur" value={possesseur} onChange={(e) => setPossesseur(e.target.value)} />    
                    </div>
                </div>
                <div class="form row mt-3 mb-3">
                    <label className="col-sm-2 control-label">Entrer libelle : </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="text" placeholder="Libelle" value={libelle} onChange={(e) => setLibelle(e.target.value)} />    
                    </div>
                </div>
                <div className="form row mb-3">
                    <label className="col-sm-2 control-label">Donner sa valeur : </label>
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
                <div class="form row mt-3 mb-3">
                    <label className="col-sm-2 control-label">Valeur constante : </label>
                    <div className="col-sm-4">
                        <input className='form-control' type="number" placeholder="valeur" value={valeurConstante} onChange={(e) => setValeurConstante(e.target.value)} />    
                    </div>
                </div>
                <br />
                <button className='btn btn-success m-5' type='submit'>Créer</button>
            </Form>
        </div>
        
    );
};

export default CreatePossessionPage;
