
const express = require("express");
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

const Data = {
    model: 'Patrimoine',
    data: {
        possessions: [
            {
                "model": "Patrimoine",
                "data": {
                    "possesseur": { "nom": "John Doe" },
                    "possessions": [
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "MacBook Pro",
                            "valeur": 4300000,
                            "dateDebut": "2023-12-25T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 5
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Compte épargne",
                            "valeur": 500000,
                            "dateDebut": "2019-01-06T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": -5
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Clothes",
                            "valeur": 2000000,
                            "dateDebut": "2020-01-01T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 10
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Alternance",
                            "valeur": 600000,
                            "dateDebut": "2023-02-13T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 0,
                            "jour":1,
                            "valeurConstante": 600000
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Survie",
                            "valeur": 300000,
                            "dateDebut": "2023-02-13T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 0,
                            "jour":2,
                            "valeurConstante": -300000
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Redmi Note 9",
                            "valeur": 800000,
                            "dateDebut": "2022-12-29T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 15
                        }
                    ]
                }
            }
        ]
    }
};

app.get('/api/patrimoine', (req, res) => {
    res.json(Data);
});
app.get('/patrimoine', (req, res) => {
    res.json(Data);
});
app.get('/api/chart-data', (req, res) => {
    const dateFin = new Date(req.query.dateFin);

    const labels = [];
    const values = [];
    
    res.json({labels, values});
});
app.get('/possession',(req,res)=>{
    res.json(Data.data.possessions);
})
app.get('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    
    
    const possession = Data.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
        res.json(possession); 
    } else {
        res.status(404).json({ error: 'Possession not found' }); 
    }
});
app.post('/possession/create', (req, res) => {
    const patrimoine = Data.data.possessions[0];
    if (!patrimoine || !patrimoine.data || !patrimoine.data.possessions) {
        return res.status(404).json({ message: 'Patrimoine not found' });
    }

    const newPossession = req.body;
    patrimoine.data.possessions.push(newPossession);

    res.status(201).json(newPossession);
});


app.put('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const { possesseur, libelle: newLibelle, valeur, dateDebut, dateFin, tauxAmortissement } = req.body;

    let possession = Data.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
        possession.possesseur = possesseur;
        possession.libelle = newLibelle;
        possession.valeur = valeur;
        possession.dateDebut = dateDebut;
        possession.dateFin = dateFin;
        possession.tauxAmortissement = tauxAmortissement;

        res.status(200).json(possession); 
    } else {
        res.status(404).json({ error: 'Possession non trouvée' }); 
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


