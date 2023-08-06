import React, { useState } from "react";
import { Col, Input, Label } from "reactstrap";
import { Button } from "react-bootstrap";
import {
  Div,
  Title,
  Login,
  RowInput,
  ButtonEntrar,
  ButtonClique,
  Hr, 
  P,
  LabelCheck
} from "./style";
import { createUsers } from "../../services/createUsers";
import Swal from "sweetalert"

export const CreateUSer = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (user === "") {
      Swal("Ops!", "Campo Usuáro precisa ser preenchido!", "error");
      return;
    }
    if (password === "") {
      Swal("Ops!", "Campo Senha precisa ser preenchido!", "error");
      return;
    }
    if (confirmPassword === "") {
      Swal("Ops!", "Campo Confirmação de Senha precisa ser preenchido!", "error");
      return;
    }
    if (password !== confirmPassword) {
      Swal("Ops!", "Os Campos Senha e Confirmação de Senha não conferem!", "error");
      return;
    }

    try {
      await createUsers({
        user_name: user,
        password: password,
        confirm_password: confirmPassword,
      });
  
      setUser("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      Swal("Ops!", "Já existe um usuário com esse nome cadastrado!", "error");

    }
  };

  return (
    <>
      <Title> Sky Store </Title>
      <Div>
        <Login> Criar Usuário </Login>
        <RowInput>
          <Col>
            <Col>
              <Label htmlFor="" style={{ color: "white" }}>
                Usuário
              </Label>
              <Input
                type="text"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Label htmlFor="" style={{ color: "white" }}>
                Senha
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
            <Col>
              <Label htmlFor="" style={{ color: "white" }}>
                Confirmação de Senha
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
            <LabelCheck
              htmlFor="showPassword"
              style={{ color: "white", marginTop: "5px", marginLeft: "5px" }}
            >
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Mostrar senha
            </LabelCheck>
          </Col>
        </RowInput>
        <ButtonEntrar>
          <Button variant="outline-info" onClick={() => handleSubmit()}>
            Criar
          </Button>
        </ButtonEntrar>
        <Hr></Hr>
        <P>
          Se você ainda não possui cadastro:
        </P>
        <ButtonClique>
          <Button variant="outline-info" href="/">
            Fazer Login
          </Button>
        </ButtonClique>
      </Div>
    </>
  );
};
