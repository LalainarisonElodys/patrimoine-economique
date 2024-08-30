const express = require("express");
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

let Data = {
    "model": "Patrimoine",
    "data": {
      "possesseur": { "nom": "John Doe" },
      "possessions": [
        {
          "possesseur": { "nom": "John Doe" },
          "libelle": "MacBook Pro",
          "valeur": 4000000,
          "dateDebut": "2023-12-25T00:00:00.000Z",
          "dateFin": null,
          "tauxAmortissement": 5
        },
        {
          "possesseur": { "nom": "John Doe" },
          "libelle": "Alternance",
          "valeur": 0,
          "dateDebut": "2022-12-31T21:00:00.000Z",
          "dateFin": null,
          "tauxAmortissement": null,
          "jour": 1,
          "valeurConstante": 500000
        },
        {
          "possesseur": { "nom": "John Doe" },
          "libelle": "Survie",
          "valeur": 0,
          "dateDebut": "2022-12-31T21:00:00.000Z",
          "dateFin": null,
          "tauxAmortissement": null,
          "jour": 2,
          "valeurConstante": -300000
        },
        {
          "possesseur": { "nom": "John Doe" },
          "libelle": "MacBook Pro",
          "valeur": 4000000,
          "dateDebut": "2023-12-25T00:00:00.000Z",
          "dateFin": null,
          "tauxAmortissement": 5
        },
        {
          "possesseur": { "nom": "John Doe" },
          "libelle": "Alternance",
          "valeur": 0,
          "dateDebut": "2022-12-31T21:00:00.000Z",
          "dateFin": null,
          "tauxAmortissement": null,
          "jour": 1,
          "valeurConstante": 500000
        },
        {
          "possesseur": { "nom": "John Doe" },
          "libelle": "Survie",
          "valeur": 0,
          "dateDebut": "2022-12-31T21:00:00.000Z",
          "dateFin": null,
          "tauxAmortissement": null,
          "jour": 2,
          "valeurConstante": -300000
        }
      ]
    }
  }

  app.get('/api/patrimoine', (req, res) => {
    res.json(Data);
});
app.get('/possession',(req,res)=>{
    res.json(Data.data.possessions);
})
app.post('/possession/create')
app.get('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const possession = patrimoineData.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    if (possession) {
        res.json(possession); 
    } else {
        res.status(404).json({ error: 'Possession non trouvée' });
    }
});
app.put('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const { dateFin } = req.body;

    let possession = patrimoineData.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
        possession.dateFin = dateFin;
        res.status(200).json(possession);
    } else {
        res.status(404).json({ error: 'Possession non trouvée' });
    }
});

app.get('/api/chart-data', (req, res) => {
    const dateFin = new Date(req.query.dateFin);
    const labels = [];
    const values = [];
    res.json({labels, values});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
})
