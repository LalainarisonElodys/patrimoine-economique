const express = require('express');
const router = express.Router();

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
    res.json({ valeur: 50000 }); // Dummy response
});

module.exports = router;