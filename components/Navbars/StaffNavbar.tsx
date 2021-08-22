import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import {  useAuthState } from '../../context/context';

const StaffNavbar = () => {
    const auth = useAuthState()
    const isStaff = auth.user.id === "0"

    return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Testing</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav>
                { isStaff && <Nav.Link href="#home">Student</Nav.Link> }
                <Nav.Link href="#home">Challenge</Nav.Link>
                <Button variant="primary">{ auth.user.name }</Button>
            </Nav>
        </Container>
    </Navbar>
    )
}

export default StaffNavbar