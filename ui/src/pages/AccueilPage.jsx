import { useNavigate } from 'react-router-dom';
import { Container, Button, Row } from 'react-bootstrap';

function AccueilPage() {
    const navigate = useNavigate();
    return (
        <Container>
            <Row className='text-center mt-5'>
                <h1>Bienvenue dans la gestion de patrimoine</h1>
            </Row>
            <Row md={4} className='mt-5 d-flex justify-content-evenly'>
            <Button variant='outline-warning' onClick={() => navigate(`/possession`)}>Voir possession</Button>
            <Button variant='outline-warning' onClick={() => navigate(`/patrimoine`)}>Voir patrimoine</Button>
            </Row>
        </Container>
    )
}
export default AccueilPage;

