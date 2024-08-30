const express = require('express');
const router = express.Router();
const possessionsData = require('../data');

//maka valeur an'ilay patrimoine
router.get('/:date', (req, res) => {
    const { date } = req.params;
    let patrimoineValeur = calculatePatrimoineValueOnDate(date);
    res.json({ date, valeur: patrimoineValeur });
});

//get valeur patri range
router.post('/range', (req, res) => {
    const { type, dateDebut, dateFin, jour } = req.body;
    let patrimoineRange = calculatePatrimoineValueRange(dateDebut, dateFin, jour, type);
    res.json(patrimoineRange);
});

function calculatePatrimoineValueOnDate(date) {
    console.log('Calculating patrimoine value for date:', date);
    let totalValue = 0;
    let targetDate = new Date(date);

    possessionsData.forEach(possession => {
        let possessionValue = possession.valeur;
        let possessionStartDate = new Date(possession.dateDebut);
        let possessionEndDate = possession.dateFin ? new Date(possession.dateFin) : null;

        if (targetDate >= possessionStartDate && (!possessionEndDate || targetDate <= possessionEndDate)) {
            if (possession.tauxAmortissement) {

                let yearsElapsed = (targetDate - possessionStartDate) / (1000 * 60 * 60 * 24 * 365);
                possessionValue -= possessionValue * (possession.tauxAmortissement / 100) * yearsElapsed;
                possessionValue = Math.max(possessionValue, 0); 
            }
            totalValue += possessionValue;
        }
    });
    console.log('Total value calculated:', totalValue);
    return totalValue;
}

function calculatePatrimoineValueRange(dateDebut, dateFin, jour, type) {
    let startDate = new Date(dateDebut);
    let endDate = new Date(dateFin);
    let currentDate = new Date(startDate);
    let values = [];

    while (currentDate <= endDate) {
        currentDate.setDate(jour);
        values.push({
            date: currentDate.toISOString().split('T')[0],
            valeur: calculatePatrimoineValueOnDate(currentDate)
        });

        if (type === 'month') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    }
    return values;
}


module.exports = router;