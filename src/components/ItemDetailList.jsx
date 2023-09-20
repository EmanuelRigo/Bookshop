import ItemDetail from "./ItemDetail";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function ItemDetailList({ products }) {
  const params = useParams();
  const [producto, setProduct] = useState({});

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id === parseInt(params.id)
    );

    setProduct(foundProduct);
    console.log(producto);
  });

  return <ItemDetail product={producto}></ItemDetail>;
}

export default ItemDetailList;
