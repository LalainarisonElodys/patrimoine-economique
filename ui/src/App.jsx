import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Button, InputGroup, Form, FormLabel, Table } from "react-bootstrap";
import JSON from '../../data/data.json';
import { johnPatrimoine, valeur } from "../../index.js";
/*
function GestionDePatrimoine(){
  const [data, setData] = useState(JSON);
  const [newDate, setNewDate] = useState(new Date());
  const [patrimoine, setPatrimoine] = useState(0);

  useEffect(() => {
    fetch('../data.json')
    .then (reponse => reponse.json())
    .then (data => setData(data))
    .catch(error => console.error('Error fetching data:', error))
  }, []);

  const patrimoineValue = (valeurI, dateDuDebut, datefin, tauxDAmortisseent) =>{
    const debut = new Date(dateDuDebut);
    const fin = new Date(datefin);
    const news = new Date(newDate);
  

    const durree = (news - debut) / (1000 * 60 * 60 * 24 * 365);

    const depreciation = tauxDAmortisseent * durree;
    const nouveauValeur = valeurI * (1 - depreciation);

    return Math.max(nouveauValeur, 0);

  };

  function handleClick(){
    setPatrimoine(johnPatrimoine.getValeur())
  }

  console.log(data[1].possessions);
  const listPossession = data[1].possessions
  
  return (
    <>
    <Table bordered border={4} className="mt-5 container">
      <thead class="text-center">
        <tr>
          <th>Libelle</th>
          <th>Valeur Initiale</th>
          <th>Date début</th>
          <th>Date fin</th>
          <th>Taux d'amortissement</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          <tr key={index}>
            <td>{item.libelle}</td>
            <td>{item.valeur} </td>
            <td>{item.dateDebut}</td>
            <td>{item.dateFin}</td>
            <td>{item.tauxAmortissement * 100}</td>
            <td> </td>
          </tr>
        })}
      </tbody>
    </Table>
    </>
  )

}


function dateAndSubmitbutton(){
  
  const [dateDebut, setDateDebut] = useState(new Date());

  return (
    <>
    <InputGroup className="mt-5 container">
      <p>Veiller entrer une date: </p> 
      <br />
      <input type="date" onSelect={dateDebut} onChange={(date) => setDateDebut(date)} />
      <Button className=" btn btn-md bg-success" onClick={() => handleClick()}>
        Valider
      </Button>
    </InputGroup>    
    </>
  )
    /*
  return (
    <Form className="container mt-5">
        <FormLabel className="text-primary mb-2">Veiller entrer une date :</FormLabel> 
        <br />
        <input type="date"/> 
        <br />
        <Button className="mt-5 btn btn-md bg-success">
            Submit
        </Button>
    </Form>
)
    */

/*
export default function App(){
  return (
    <>
      {GestionDePatrimoine()}
      {dateAndSubmitbutton()}
    </>
  )
}
*/



function App() {
  const [data, setData] = useState(JSON)
  const [patrimoine, setPatrimoine] = useState(0)
  const [selectedDate, setSelectedDate] = useState('');

  // Fonction pour gérer le changement de la date
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  function handleClick() {
    setPatrimoine(johnPatrimoine.getValeur(selectedDate))
  }

  const listPossession = valeur[1].possessions;
  
  return (
    <div>
      <Table >
        <thead>
          <tr>
            <th>nom</th>
            <th>valeur</th>
            <th>date debut</th>
            <th>amortissement</th>
            <th>possesseur</th>
          </tr>
        </thead>
        <tbody>
          {listPossession.map(function(possession, index) {
            return (
              <tr key={index}>
                <td>{possession.libelle}</td>
                <td>{possession.valeur}</td>
                <td>{possession.dateDebut.slice(0, 10)}</td>
                <td>{possession.tauxAmortissement}</td>
                <td>{possession.valeurActuelle}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>

      <p>
        Patrimoine :  {patrimoine} Ar
      </p>
      
      <Form>
        <input type="date" onChange={(e) => handleDateChange(e)}/>
        <Button onClick={() => handleClick()}>Valider</Button>
      </Form>
  </div>
  )
  
}

export default App
