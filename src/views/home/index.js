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
} from "./style";
import { useHistory } from "react-router-dom";
import login from "../../services/login";
import Swal from "sweetalert";

export const Home = () => {
  const [user, setUser] = useState({ user: "", password: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const history = useHistory();

  const handleSubmit = async () => {
    if (username === "") {
      Swal("Ops!", "Campo Usuário precisa ser preenchido!", "error");
      return;
    }
    if (password === "") {
      Swal("Ops!", "Campo Senha precisa ser preenchido!", "error");
      return;
    }

    try {
      var result = await login({
        user_name: username,
        password: password,
      });

      if (result.user.id > 0) {
        history.push("/registration");
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      Swal("Ops!", "O seu usuário ou senha estão incorretos!", "error");
    }
  };

  return (
    <>
      <Title> Sky Store </Title>
      <Div>
        <Login> Login </Login>
        <RowInput>
          <Col>
            <Col>
              <Label htmlFor="" style={{ color: "white" }}>
                Usuário
              </Label>
              <Input
                type="text"
                value={username}
                onChange={(e) => {
                  handleChange("user", e.target.value);
                  setUsername(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Label htmlFor="" style={{ color: "white" }}>
                Senha
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  handleChange("password", e.target.value);
                  setPassword(e.target.value);
                }}
              />
            </Col>
          </Col>
        </RowInput>
        <ButtonEntrar>
          <Button variant="outline-info" onClick={() => handleSubmit()}>
            Entrar
          </Button>
        </ButtonEntrar>
        <Hr></Hr>
        <P>
          Se você ainda não possui cadastro:
        </P>
        <ButtonClique>
          <Button variant="outline-info" href="/createUser">
            Cadastre-se
          </Button>
        </ButtonClique>
      </Div>
    </>
  );
};
