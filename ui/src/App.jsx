import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Table } from "react-bootstrap";
import Possession from "../../models/possessions/Possession.js";
import Personne from "../../models/Personne.js";
import Flux from "../../models/possessions/Flux.js";
import Patrimoine from "../../models/Patrimoine.js";


const Header = () => {
  return (
    <header>
        <nav className=" navbar-expand-lg fixed-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li><a href="/patrimoine">Patrimoine page</a></li>
                <li><a href="/possession">Possession List page</a></li>
              </ul>
            </div>
          </div>
        </nav>
  </header>
  )
}

const john =new Personne ("john");
let array =[ ];

function Tab() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur des données');
        }
        return response.json();
      })
      .then((jsonData) => {
        const possessions = jsonData.find(item => item.model === "Patrimoine").data.possessions;
        setData(possessions);
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });data
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        <Table bordered border={4} className="mt-5 container">
          <thead>
            <tr className="text-center">
              <th>Libelle</th>
              <th>Valeur</th>
              <th>Date de Début</th>
              <th>Date de Fin</th>
              <th>Taux d'Amortissement</th>
              <th>Jour</th>
              <th>Valeur Actuelle</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              let poss ;
               if (item.valeurConstante) {
                  poss = new Flux (
                    john,item.libelle,item.valeurConstante,new Date(item.dateDebut),new Date(item.dateFin),item.tauxAmortissement,item.jour
                  )
                
               }
               else {
                  poss = new Possession (
                    john, item.libelle,item.valeur, new Date(item.dateDebut), new Date(item.dateFin), item.tauxAmortissement,item.jour,
                  )
               }
               array.push(poss);
             
              return (
              <tr key={index}>
                <td>{poss.libelle}</td>
                <td>{poss.valeur || poss.valeurConstante}</td>
                <td>{poss.dateDebut.toDateString()}</td>
                <td>{poss.dateFin.toDateString() || '0'}</td>
                <td>{poss.tauxAmortissement || '0'}</td>
                <td>{poss.jour || '0'}</td>
                <td>{poss.getValeur(new Date()) || '0'}</td>
              </tr>
            )})}
          </tbody>
        </Table>
      ) : (
        <p>...</p>
      )}
    </div>
  );
}
  
function GeneratePatri(){
  const patrimoine =new Patrimoine (john,array);
  const [valeurDeLaDate, setDateValue] = useState("");
  const [totalValeurPatri, setTotalValeurPatri] = useState(0);


 const calc = () => {
  const totalValue = patrimoine.getValeur(new Date(valeurDeLaDate));
  setTotalValeurPatri(totalValue);
 }


  return (
  <div className="container">
    <label className="text-primary">Veiller entrer une date : </label>
    <input type="date" name="date" value={valeurDeLaDate} onChange={(event)=>{
      setDateValue (event.target.value);
    }}/>

    <input type="button" value="Valider" className="md-2 primary" 
    onClick={calc}
    />

    {totalValeurPatri !== 0 && ( 
    <p className="container mt-5">
      La valeur de la Patrimoine est : {totalValeurPatri} Ar
    </p>
    )}
    
  </div>
)
}

 function App() {
  return (
    <div>
      <Header/>
      <h1 className="text-center text-primary mt-3">Possessions</h1>
      <Tab />
      <GeneratePatri />
      
    </div>

  );
}
export default App;