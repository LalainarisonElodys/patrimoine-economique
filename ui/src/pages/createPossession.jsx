import React, { useState } from 'react';
import axios from 'axios';
import { FormGroup } from 'react-bootstrap';

const CreatePossession = () => {
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState

    return (
        <FormGroup>
            <Form.Label>Libelle: </Form.Label>
        </FormGroup>
    );

}
export default CreatePossession;