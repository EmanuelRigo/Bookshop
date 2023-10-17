import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { contexto } from "./CustomProvider";

function ShowDetails() {
  const { cliente, sumarUsuario } = useContext(contexto);
  console.log(cliente);

  return (
    <div>
      ShowDetails
      <p>{cliente.datosEnvio.name} </p>
      <p>{cliente.datosEnvio.surname} </p>
      <p>{cliente.datosEnvio.address} </p>
      {cliente.compras.map((item) => {
        return (
          <p key={item.id}>
            {item.title} {item.cantidad}
          </p>
        );
      })}
      <Link onClick={sumarUsuario} to={"/buy"}>
        confirmar compra
      </Link>
    </div>
  );
}

export default ShowDetails;