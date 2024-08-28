
const express = require('express');
const router = express.Router();

//exemple possession pour tester
let possessionsData = [
    {
        "model": "Patrimoine",
        "data": {
          "possessions": [
            {
              "libelle": "MacBook Pro",
              "valeur": 4000000,
              "dateDebut": "2023-12-25T00:00:00.000Z",
              "dateFin": null,
              "tauxAmortissement": 5
            },
            {
              "libelle": "Alternance",
              "valeur": 0,
              "dateDebut": "2022-12-31T21:00:00.000Z",
              "dateFin": null,
              "tauxAmortissement": null,
              "jour": 1,
              "valeurConstante": 500000
            },
            {
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
];


//maka liste an'ilay possession
router.get('/possession', (req, res) => {
    res.json(possessionsData);
});

//m'créer possession
router.post('/create', (req, res) => {
    const { libelle, valeur, dateDebut, taux } = req.body;
    possessionsData.push({ libelle, valeur, dateDebut, taux, dateFin: null });
    res.status(201).json({ message: 'Possession created' });
});

//manao update poss
router.put('/:libelle', (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;
    let possession = possessionsData.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = dateFin;
        res.json({ message: 'Possession updated' });
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

//mi'close an'ilay poss
router.post('/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    let possession = possessionsData.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = new Date().toISOString().split('T')[0];
        res.json({ message: 'Possession closed' });
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

module.exports = router;