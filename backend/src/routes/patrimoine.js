const express = require('express');
const router = express.Router();


//ex hi'testena an'ilay code...
const patrimoine = [
    { date: '2024-08-01', valeur: 100000 },
    { date: '2024-08-02', valeur: 105000 }
];
//maka valeur an'ilay patrimoine
router.get('/:date', (req, res) => {
    const { date } = req.params;
    const value = patrimoine.find(p => p.date === date);
    if (value) {
        res.json({ valeur: value.valeur });
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

//get valeur patri range
router.post('/range', (req, res) => {
    const { type, dateDebut, dateFin, jour } = req.body;
    // Implement logic for range and type
    res.json({ valeur: 50000 }); 
});

module.exports = router;