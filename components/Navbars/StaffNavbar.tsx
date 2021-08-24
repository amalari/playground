import { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { useAuthState } from "../../context/context";
import Login from "../Auth/Login";

const StaffNavbar = () => {
  const auth = useAuthState();
  const [loginShow, setLoginShow] = useState(false);
  const isStaff = auth.user.id === "0";

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Testing</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav>
            {isStaff && (
              <span className="my-2">
                <Link href="/student">Student</Link>
              </span>
            )}
            <span className="mx-2 my-2">
              <Link href="/">Challenge</Link>
            </span>
            <Button variant="primary" onClick={() => setLoginShow(true)}>
              {auth.user.name}
            </Button>
          </Nav>
        </Container>
      </Navbar>
      {loginShow && (
        <Login show={loginShow} onHide={() => setLoginShow(false)} />
      )}
    </>
  );
};

export default StaffNavbar;
