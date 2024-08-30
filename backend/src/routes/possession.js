import {Router} from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.send('Possessions');
});


router.post('/create', (req, res) => {
    res.status(201).json({ message: 'Possession created' });
});


router.put('/:libelle', (req, res) => {
    res.send(`Possession est à jour`);
});

router.post('/:libelle/close', (req, res) => {
    res.send(`Possession à été bien fermer`);
});

module.exports = router;