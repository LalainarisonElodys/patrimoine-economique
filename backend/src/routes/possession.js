const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');


function getPossessions() {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    const possessionsData = JSON.parse(jsonData);
    return possessionsData.data.possessions;
}

function savePossessions(possessions) {
    const possessionsData = { data: { possessions } };;
    fs.writeFileSync(dataPath, JSON.stringify(possessionsData, null, 2));
}

//maka liste an'ilay possession
router.get('/', (req, res) => {
    const possessions = getPossessions();
    res.json({ data: { possessions } });
});

//m'créer possession
router.post('/create', (req, res) => {
    const { libelle, valeur, dateDebut, taux } = req.body;
    let possessions = getPossessions();
    possessions.push({ libelle, valeur, dateDebut, taux, dateFin: null });
    savePossessions(possessions);
    res.status(201).json({ message: 'Possession created' });
});

//manao update poss
router.put('/:libelle', (req, res) => {
    const { libelle } = req.params;
    const { dateFin } = req.body;
    let possessions = getPossessions();
    let possession = possessions.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = dateFin;
        savePossessions(possessions);
        res.json({ message: 'Possession updated' });
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

//mi'close an'ilay poss
router.post('/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    let possessions = getPossessions();
    let possession = possessions.find(p => p.libelle === libelle);
    if (possession) {
        possession.dateFin = new Date().toISOString().split('T')[0];
        savePossessions(possessions);
        res.json({ message: 'Possession closed' });
    } else {
        res.status(404).json({ message: 'Possession not found' });
    }
});

module.exports = router;