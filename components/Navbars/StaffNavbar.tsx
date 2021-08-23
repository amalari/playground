import { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import {  useAuthState } from '../../context/context';
import Login from '../Auth/Login'

const StaffNavbar = () => {
    const auth = useAuthState()
    const [loginShow, setLoginShow] = useState(false);
    const isStaff = auth.user.id === "0"

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Testing</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav>
                        { isStaff && <Nav.Link href="#home">Student</Nav.Link> }
                        <Nav.Link href="#home">Challenge</Nav.Link>
                        <Button variant="primary" onClick={() => setLoginShow(true)}>{ auth.user.name }</Button>
                    </Nav>
                </Container>
            </Navbar>
            {loginShow && <Login show={loginShow} onHide={() => setLoginShow(false)} />}
        </>
    )
}

export default StaffNavbar