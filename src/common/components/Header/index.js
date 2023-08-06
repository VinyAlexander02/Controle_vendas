import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand style={{ color: '#87CEFA' }}>Sky Store</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/registration"> Cadastro </Nav.Link>
            <Nav.Link href="/sells"> Vendas </Nav.Link>
            <Nav.Link href="/accompaniment">Acompanhamento</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
