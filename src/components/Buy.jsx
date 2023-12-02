import React from "react";
import { useContext, useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { contexto } from "./CustomProvider";
import { Container, Spinner, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Buy() {
  const { busquedaCompra } = useContext(contexto);

  const [sale, setSale] = useState();
  const [date, setDate] = useState();

  const [day, setDay] = useState();
  const [month, setMonth] = useState();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const productosCollection = collection(db, "ventas");
        const referencia = doc(productosCollection, busquedaCompra);
        const pedido = await getDoc(referencia);

        if (pedido.exists()) {
          const producto = { ...pedido.data(), id: pedido.id };
          setSale(producto);
          ////
          let fecha = new Date(producto.fecha.toDate()); // Convierte el objeto Firestore a un objeto de fecha de JavaScript

          // Sumar 3 días
          fecha.setDate(fecha.getDate() + 3);

          //////
          setDate(fecha);
          setDay(date.getDate())
          setMonth(date.getMonth() + 1)
          console.log(day, month)
          console.log(producto.fecha.toDate());
          console.log(typeof date);
        } else {
          console.log("El documento no existe.");
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      }
    };

    obtenerDatos();
  }, [busquedaCompra]);

  return (
    <>
      {sale ? (
        <>
          <Container>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>
                  Gracias por la compra {sale.envio.name}!
                </Card.Title>
                <Card.Text>
                  los productos llegaran el {day}/{month}
                </Card.Text>
                <Button variant="verde-neon">inicio</Button>
              </Card.Body>
            </Card>
          </Container>
        </>
      ) : (
        <Container className="d-flex  align-items-center justify-content-center">
          <Spinner
            animation="border"
            variant="verde-neon"
            size="lg"
            className="p-5 m-5"
          />
        </Container>
      )}
    </>
  );
}

export default Buy;
