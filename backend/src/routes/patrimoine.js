import {Router} from 'express';
const router = Router(); 

//maka valeur an'ilay patrimoine
router.get('/:date', (req, res) => {
    res.send(`Valeur du patrimoine pour la date ${req.params.date}`);
});

//get valeur patri range
router.post('/range', (req, res) => {
    res.send('Patrimoine value');
});


module.exports = router;
