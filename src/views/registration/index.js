import React, { useEffect, useState } from "react";
import {
  Div,
  DivButton,
  DivTable,
  Title,
  RowInput,
  TH,
  TD,
  Labels,
} from "./style";
import { Col, Input, Table } from "reactstrap";
import { Button, Row } from "react-bootstrap";
import { Header } from "../../common/components/Header";
import { getProducts, createProducts } from "../../services/products";
import Swal from "sweetalert";

export const Registration = () => {
  const [productCod, setProdutCod] = useState("");
  const [buyValue, setBuyValue] = useState("");
  const [sellValue, setSellValue] = useState("");
  const [description, setDescription] = useState("");
  const [productsList, setProductList] = useState([]);

  const handleSubmit = async () => {
    if (productCod === "") {
      Swal("Ops!", "Campo Código Produto precisa ser preenchido!", "error");
      return;
    }
    if (buyValue === "") {
      Swal("Ops!", "Campo Valor Compra precisa ser preenchido!", "error");
      return;
    }
    if (sellValue === "") {
      Swal("Ops!", "Campo Valor Venda precisa ser preenchido!", "error");
      return;
    }
    if (description === "") {
      Swal("Ops!", "Campo Descrição precisa ser preenchido!", "error");
      return;
    }

    await createProducts({
      product_cod: productCod,
      buy_value: buyValue,
      sell_value: sellValue,
      description: description,
    });
    setProdutCod("");
    setBuyValue("");
    setSellValue("");
    setDescription("");
    
    await fetchProducts();
  };

  const fetchProducts = async () => {
    const productsList = await getProducts();
    setProductList(productsList.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Title>Cadastro de Produtos</Title>;
      <Div>
        <RowInput>
          <Row>
            <Col>
              <Labels htmlFor=""> Código Produto </Labels>
              <Input
                type="text"
                value={productCod}
                onChange={(e) => setProdutCod(e.target.value)}
              />
            </Col>
            <Col>
              <Labels htmlFor=""> Valor Compra R$</Labels>
              <Input
                type="number"
                value={buyValue}
                onChange={(e) => setBuyValue(e.target.value)}
              />
            </Col>
            <Col>
              <Labels htmlFor=""> Valor Venda R$</Labels>
              <Input
                type="text"
                value={sellValue}
                onChange={(e) => setSellValue(e.target.value)}
              />
            </Col>
          </Row>
        </RowInput>
        <RowInput>
          <Row>
            <Col>
              <Labels htmlFor=""> Descrição </Labels>
              <Input
                type="text"
                id="descricao"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
        </RowInput>
        <DivButton>
          <Button variant="outline-info" onClick={() => handleSubmit()}>
            Salvar
          </Button>
        </DivButton>
        <DivTable>
          <Table responsive>
            <thead>
              <tr>
                <TH> Cod Produto </TH>
                <TH>Valor de Compra</TH>
                <TH>Valor de Venda</TH>
                <TH>Descrição</TH>
              </tr>
            </thead>
            <tbody>
              {productsList.map((pdcts) => {
                return (
                  <tr key={pdcts.id}>
                    <TD> {pdcts.product_cod} </TD>
                    <TD> {parseFloat(pdcts.buy_value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} </TD>
                    <TD>{parseFloat(pdcts.sell_value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</TD>
                    <TD> {pdcts.description} </TD>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </DivTable>
      </Div>
    </>
  );
};
