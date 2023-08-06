import React, { useEffect, useState } from "react";
import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import { Table } from "reactstrap";
import { Header } from "../../common/components/Header";
import { getSells } from "../../services/sells";
import { Div, DivTable, H2, Title, FormTable, TH, TD } from "./style";
import { utils, writeFile } from "xlsx";

function formatDate(dateString) {
  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0); 
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedYear = String(year);

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}

export const Accompaniment = () => {
  const [sellsList, setSellsList] = useState([]);
  const [clientName, setClientName] = useState("");
  const [sellDate, setSellDate] = useState("");

  const fetchSells = async () => {
    const sellsList = await getSells(clientName, sellDate);
    setSellsList(sellsList.data);
  };

  useEffect(() => {
    fetchSells();
  }, [clientName, sellDate]);

  function calc(tt) {
    let sum = 0;
    for (let i = 0; i < tt.length; i++) {
      sum += parseInt(tt[i].total, 10);
    }
    return sum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  const exportToExcel = () => {
    const data = [];
    const headers = [
      "Nome Cliente",
      "Telefone Cliente",
      "Cod do produto",
      "Descrição",
      "Valor Produto R$",
      "Quantidade",
      "Tipo de Pagamento",
      "Data",
      "Total Pago",
    ];

    data.push(headers);

    sellsList.forEach((sll) => {
      const rowData = [
        sll.client_name,
        sll.client_phone,
        sll.product_cod,
        sll.description,
        parseFloat(sll.sell_value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        sll.quantity,
        sll.payment,
        formatDate(sll.sell_date),
        parseFloat(sll.total).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      ];

      data.push(rowData);
    });

    const workbook = utils.book_new();
    const worksheet = utils.aoa_to_sheet(data);
    utils.book_append_sheet(workbook, worksheet, "Relatório");

    writeFile(workbook, "vendas.xlsx");
  };

  return (
    <>
      <Header />
      <Title> Acompanhamento de Vendas </Title>
      <Div>
        <FormTable>
          <Row className="g-2">
            <Col>
              <FloatingLabel controlId="floatingInputGrid" label="Nome Cliente">
                <Form.Control
                  type="text"
                  placeholder="Nome"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel controlId="floatingInputGrid" label="Data">
                <Form.Control
                  type="date"
                  placeholder="Data"
                  value={sellDate}
                  onChange={(e) => setSellDate(e.target.value)}
                />
              </FloatingLabel>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="submit"
                variant="outline-info"
                size="lg"
                onClick={exportToExcel}
              >
                Gerar Relátorio
              </Button>
            </Col>
          </Row>
        </FormTable>
        <H2> Total: {calc(sellsList)} </H2>
        <DivTable>
          <Table responsive>
            <thead>
              <tr>
                <TH> Nome Cliente </TH>
                <TH> Telefone Cliente </TH>
                <TH> Cod do produto </TH>
                <TH> Descrição </TH>
                <TH> Valor R$ </TH>
                <TH> Quantidade </TH>
                <TH> Tipo de Pagamento </TH>
                <TH> Data </TH>
                <TH> Total Pago </TH>
              </tr>
            </thead>
            <tbody>
              {sellsList.map((sll) => {
                return (
                  <tr key={sll.id}>
                    <TD>{sll.client_name}</TD>
                    <TD>{sll.client_phone}</TD>
                    <TD>{sll.product_cod}</TD>
                    <TD>{sll.description}</TD>
                    <TD>
                      {parseFloat(sll.sell_value).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TD>
                    <TD>{sll.quantity}</TD>
                    <TD>{sll.payment}</TD>
                    <TD>{formatDate(sll.sell_date)}</TD>
                    <TD>
                      {parseFloat(sll.total).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TD>
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
