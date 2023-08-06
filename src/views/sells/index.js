import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { Input } from "reactstrap";
import { Header } from "../../common/components/Header";
import { createSells, getSells } from "../../services/sells";
import { getProductByCode } from "../../services/products";
import {
  Div,
  ButtonVender,
  RowInput,
  Title,
  Labels,
  ButtonPlus,
} from "./style";
import Swal from "sweetalert";

export const Sells = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [sellValue, setSellValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [payment, setPayment] = useState("");
  const [date, setDate] = useState("");
  const [total, setTotal] = useState("");
  const [sellsList, setSellsList] = useState([]);

  const handleSubmit = async () => {
    if (name === "") {
      Swal("Ops!", "Campo Nome Cliente precisa ser preenchido!", "error");
      return;
    }
    if (phone === "") {
      Swal("Ops!", "Campo Telefone precisa ser preenchido!", "error");
      return;
    }

    if (product === "") {
      Swal("Ops!", "Campo Código Produto precisa ser preenchido!", "error");
    }

    if (description === "") {
      Swal("Ops!", "Campo Descrição precisa ser preenchido!", "error");
    }

    if (sellValue === "") {
      Swal("Ops!", "Campo Valor precisa ser preenchido!", "error");
    }

    if (quantity === "") {
      Swal("Ops!", "Campo Quantidade precisa ser preenchido!", "error");
    }

    if (payment === "" || payment === "Forma de pagamento") {
      Swal("Ops!", "Campo Pagamento precisa ser preenchido!", "error");
      return;
    }

    if (date === "") {
      Swal("Ops!", "Campo Data precisa ser preenchido!", "error");
      return;
    }

    if (total === "") {
      Swal("Ops!", "Campo Total precisa ser preenchido!", "error");
      return;
    }

    await createSells({
      client_name: name,
      client_phone: phone,
      product_cod: product,
      description: description,
      sell_value: sellValue,
      quantity: quantity,
      payment: payment,
      sell_date: date,
      total: total,
    });

    setName("");
    setPhone("");
    setProduct("");
    setDescription("");
    setSellValue("");
    setQuantity("");
    setPayment("");
    setDate("");
    setTotal("");

    await fetchSells();
  };

  const fetchSells = async () => {
    const sellsList = await getSells();
    setSellsList(sellsList.data);
  };

  useEffect(() => {
    fetchSells();
  }, []);

  function onBlurProduct(ev) {
    const productCode = ev.target.value;
    getProductByCode(productCode)
      .then((filteredProducts) => {
        if (filteredProducts.length > 0) {
          setDescription(filteredProducts[0].description || "");
          setSellValue(filteredProducts[0].sell_value || "");
        } else {
          setDescription("");
          setSellValue("");
          Swal("Ops!", "Produto não encontrado!", "error");
        }
      })
      .catch((error) => console.log({ error: error.message }));
  }

  function onBlurProductQt() {
    const numericValue = parseFloat(quantity) || 0;
    setQuantity(numericValue);
  }

  useEffect(() => {
    const numericSellValue = parseFloat(sellValue) || 0;
    const numericQuantity = parseFloat(quantity) || 0;
    const result = numericSellValue * numericQuantity;
    setTotal(result);
  }, [sellValue, quantity]);

  // function onBlurProduct(ev) {
  //   const productCode = ev.target.value;
  //   getProductByCode(productCode)
  //     .then((filteredProducts) => console.log(filteredProducts))
  //     .catch((error) => console.log({ error: error.message }));
  // }

  const formatPhoneNumber = (phoneNumber) => {
    // Remove qualquer caractere que não seja número
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Aplica a formatação desejada
    const formatted = cleaned.replace(/^(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");

    return formatted;
  };

  const handleChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  return (
    <>
      <Header />
      <Title>Vendas</Title>
      <Div>
        <RowInput>
          <Row>
            <Col>
              <Labels htmlFor="name">Nome Cliente</Labels>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <Labels htmlFor="phone">Telefone Cliente</Labels>
              <Input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </RowInput>

        <RowInput>
          <Row>
            <Col>
              <Labels htmlFor="codProduct">Código Produto</Labels>
              <Input
                type="text"
                id="codProduct"
                value={product}
                onBlur={onBlurProduct}
                onChange={(e) => setProduct(e.target.value)}
              />
            </Col>
            <Col>
              <Labels htmlFor="description">Descrição</Labels>
              <Input
                type="text"
                id="description"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col>
              <Labels htmlFor="sellValue">Valor R$</Labels>
              <Input
                type="number"
                id="sellValue"
                value={sellValue}
                name="sellValue"
                onChange={(e) => setSellValue(e.target.value)}
              />
            </Col>
            <Col>
              <Labels htmlFor="quantity">Quantidade</Labels>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onBlur={onBlurProductQt}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Col>
          </Row>
        </RowInput>

        {/* <ButtonPlus>
          <Button variant="outline-info" type="submit">
            Adicionar Produto
          </Button>
        </ButtonPlus> */}
        <RowInput>
          <Row>
            <Col>
              <Labels htmlFor=""> Pagamento </Labels>
              <Form.Select
                id="payment-select"
                aria-label="Default select example"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option>Forma de pagamento</option>
                <option value="pix"> Pix </option>
                <option value="credit"> Crédito </option>
                <option value="debit"> Débito </option>
                <option value="money"> Dinheiro </option>
              </Form.Select>
            </Col>
            <Col>
              <Labels htmlFor=""> Data </Labels>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>
            <Col>
              <Labels htmlFor=""> Total </Labels>
              <Input
                type="text"
                value={`R$ ${total.toLocaleString("pt-BR", {
                  minimumIntegerDigits: 1,
                  maximumFractionDigits: 0,
                })}`}
                readOnly
              />
            </Col>
          </Row>
        </RowInput>
        <ButtonVender>
          <Button
            variant="outline-info"
            onClick={() => handleSubmit()}
            type="submit"
          >
            Vender
          </Button>
        </ButtonVender>
      </Div>
    </>
  );
};
