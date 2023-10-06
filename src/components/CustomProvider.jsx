import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { computeHeadingLevel } from "@testing-library/react";

export const contexto = createContext();
const Provider = contexto.Provider;

export const useCart = () => {
  const valorDelContexto = useContext(contexto);
  return valorDelContexto;
};

const CustomProvider = ({ children }) => {
  const [navBarCategory, setNavbarCategory] = useState([]);
  const [productAdded, setProductAdded] = useState({});
  const [valorcambio, setValorCambio] = useState(1);
  const [valorbusqueda, setValorBusqueda] = useState()


  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );
  const [totalProductos, setTotalProductos] = useState(
    parseInt(localStorage.getItem("totalProductos")) || 0
  );

  const [total, setTotal] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem("totalProductos", totalProductos.toString());
  }, [totalProductos]);

  useEffect(() => {
    calcularTotal();
  }, [carrito]);

  ////FUNCION PARA CONSEGUIR DATOS////

  const [bookdata, setBookdata] = useState([]);
  const [bookdataFiltrado, setBookdataFiltrado] = useState();
  const [category, setCategory] = useState({});

  const paramsFunction = (item) => {
    setCategory(item);
  };

  useEffect(() => {


    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        if (category.categoria) {
          const filtrado = res.data.filter(
            (product) => product.category.name === category.categoria
          );
          setBookdata(filtrado);
          navbarCategoryFunction(res.data);
          if(valorbusqueda){funcionBuscar()} else {console.log("no esta")}
          console.log(valorbusqueda)
         
        } else {
          setBookdata(res.data);
          navbarCategoryFunction(res.data);
          if(valorbusqueda){funcionBuscar()} else {console.log("no esta")}
          console.log(valorbusqueda)
        }
      })
      .catch((err) => console.log(err));
  }, [category.categoria, valorbusqueda]);

  ////////////////////////////////////

  ////FUNCIONES PARA BUSCAR////

  const funcionBuscar = () => {
    const filtradoBuscar = bookdata.filter((item) =>
      item.title.toLowerCase().includes(valorbusqueda.toLowerCase())
    );

    setBookdata(filtradoBuscar);
  };

  /////////////////////////////

  const addProduct = (contador, product) => {
    setProductAdded({ ...product, contador });
  };

  const incrementarCantidad = (id) => {
    const nuevosProductos = carrito.map((producto) =>
      producto.id === id
        ? { ...producto, cantidad: producto.cantidad + 1 }
        : producto
    );
    setCarrito(nuevosProductos);
  };

  const decrementarCantidad = (id) => {
    const nuevosProductos = carrito.map((producto) =>
      producto.id === id && producto.cantidad > 0
        ? { ...producto, cantidad: producto.cantidad - 1 }
        : producto
    );
    setCarrito(nuevosProductos);
  };

  const calcularTotal = () => {
    const cantidadTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );
    setTotal(cantidadTotal);
  };

  const agregarProducto = (contador, pelicula) => {
    const copy = carrito.map((producto) => {
      if (producto.id === pelicula.id) {
        return { ...producto, cantidad: producto.cantidad + contador };
      }
      return producto;
    });
    if (!copy.some((prod) => prod.id === pelicula.id)) {
      copy.push({
        ...pelicula,
        cantidad: contador,
      });
    }

    setCarrito(copy);
    setTotalProductos(totalProductos + contador);

    const nombre = "¡Agregaste " + pelicula.nombre + " al carrito!";
  };

  const eliminarProducto = (id) => {
    const copy = [...carrito];
    const index = copy.find((pelicula) => pelicula.id === id);
    setTotalProductos(totalProductos - index.cantidad);
    setCarrito(copy.filter((i) => i.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setTotalProductos(0);
  };

  const navbarCategoryFunction = (item) => {
    setNavbarCategory(item);
  };


  const valorDelContexto = {
    carrito: carrito,
    totalProductos: totalProductos,
    navbarCategoryFunction: navbarCategoryFunction,
    navBarCategory: navBarCategory,
    agregarProducto: agregarProducto,
    eliminarProducto: eliminarProducto,
    vaciarCarrito: vaciarCarrito,
    carrito: carrito,
    addProduct: addProduct,
    productAdded: productAdded,
    incrementarCantidad: incrementarCantidad,
    calcularTotal: calcularTotal,
    total: total,
    decrementarCantidad: decrementarCantidad,
    funcionBuscar: funcionBuscar,
    bookdata: bookdata,
    setCategory: setCategory,
    paramsFunction: paramsFunction,
    setInputValue: setInputValue,
    inputValue: inputValue,
    setValorBusqueda: setValorBusqueda
  };

  return <Provider value={valorDelContexto}>{children}</Provider>;
};

export default CustomProvider;
