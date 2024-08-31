
const express = require("express");
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

let Data = {
    "model": "Patrimoine",
    "data": {
      "possessions": [
        {
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
      ]
    }
  }
  
  app.get('/possession', (req, res) => {
      res.json(Data.data.possessions);
  });
  app.get('/api/patrimoine', (req, res) => {
    res.json(Data);
});
app.post('/possession/create', (req, res) => {
  const patrimoine = Data.data.possessions[0];
  if (!patrimoine || !patrimoine.data || !patrimoine.data.possessions) {
      return res.status(404).json({ message: 'Patrimoine non trouvé' });
  }

  const newPossession = req.body;
  patrimoine.data.possessions.push(newPossession);

  res.status(201).json(newPossession);
});
app.get('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const possession = Data.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    if (possession) {
        res.json(possession); 
    } else {
        res.status(404).json({ error: 'Possession not found' });
    }
});
app.put('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const { possesseur, libelle: Libelle, valeur, dateDebut, dateFin, tauxAmortissement } = req.body;

    let possession = Data.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
      possession.possesseur = possesseur;
      possession.libelle = Libelle;
      possession.valeur = valeur;
      possession.dateDebut = dateDebut;
      possession.dateFin = dateFin;
      possession.tauxAmortissement = tauxAmortissement;

      res.status(200).json(possession);
  } else {
      res.status(404).json({ error: 'Possession not found' });
  }
});

app.get('/api/chart-data', (req, res) => {
    const dateFin = new Date(req.query.dateFin);
    const labels = [];
    const valeur = [];
    res.json({labels, valeur});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
})

