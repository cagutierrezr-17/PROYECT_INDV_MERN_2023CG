import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import axios from "axios";
import "./homePage.css";

import imgLogo from "../img/tu_rincon_sabroso_logo.png";

const HomePagetest = () => {
  // estados para manejar la lista de precios con pestañas
  const [activeTab, setActiveTab] = useState("1");

  // estado para manejar la seleccion de productos
  const [selectedProducts, setSelectedProducts] = useState([]);

  // estado para capturar los datos del pedido y mostrarlos en la parte inferior una vez se presione el boton de agreagr pedido
  const [orderDetails, setOrderDetails] = useState([]);

  // estados para manejar la seleccion del detalle del pedido
  const [isCrudoSelected, setIsCrudoSelected] = useState(false);
  const [isFritoSelected, setIsFritoSelected] = useState(false);

  // estado para manejar los datos de la lista de productos
  const [listProduct, setListProduct] = useState([]);

  // estados para aumentar el order count
  const [orderCount, setOrderCount] = useState(0);

  const navigate = useNavigate();

  const changeTab = (numTab) => {
    if (activeTab !== numTab) {
      setActiveTab(numTab);
    }
  };

  // metodo para manejar los datos seleccionados por los checkboxes
  const handleCheckboxChange = (e, productName, quantity, price) => {
    if (e.target.checked) {
      const selectedProduct = {
        name: productName,
        quantity: quantity,
        price: price,
      };

      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        selectedProduct,
      ]);
    }
  };

  // metodo para agregar productos una vez se seleccionen
  const addToOrder = () => {
    // Verificar si hay productos seleccionados antes de agregar al pedido
    if (selectedProducts.length > 0 || (isCrudoSelected && isFritoSelected)) {
      const orderItem = {
        products: selectedProducts,
        isCrudo: isCrudoSelected,
        isFrito: isFritoSelected,
      };

      // Lógica para agregar productos al pedido
      setOrderDetails((prevOrderDetails) => [...prevOrderDetails, orderItem]);

      // incrementando el numero de ordenes en el navbar
      setOrderCount((prevOrderCount) => prevOrderCount + 1);

      // Limpiar los productos seleccionados después de agregarlos al pedido
      setSelectedProducts([]);
      setIsCrudoSelected(false);
      setIsFritoSelected(false);

      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    } else {
      alert("No hay productos seleccionados para agregar al pedido");
    }
  };

  // metodo para borrar pedidos de la lista
  const removeOrder = (orderIndex) => {
    setOrderDetails((prevOrderDetails) =>
      prevOrderDetails.filter((_, index) => index !== orderIndex)
    );

    setOrderCount((prevOrderCount) => prevOrderCount - 1);
  };

  // metodo para fianlizar la orden y navegar hacia la pagina de ordenes
  const finishOrder = () => {
    console.log(orderDetails);
    if (orderDetails.length > 0) {
      navigate("/order", { state: { orderDetails, orderCount } });
    } else {
      alert("No hay pedidos para finalizar.");
    }
  };

  useEffect(() => {
    let isLogged = localStorage.getItem("Logged");
    if (isLogged === null) {
      navigate("/login");
    }

    callListProducts();
  });

  const logout = () => {
    localStorage.removeItem("Logged");
    navigate("/login");
  };

  //   nuevo codigo de ingresar datos a tabla de manera iterable

  // metodo de llamada de la api que contiene la lista de precios seccionada en categorias para ser mostrada en las diferentes pestañas
  const callListProducts = async () => {
    try {
      let result = await axios.get("http://localhost:8000/api/product");
      setListProduct(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  //   variables que contienen los productois por categoria que se usan al momento de iterar la lista de productos en cada uno de los tabs
  let productQueso = listProduct.filter((prod) => prod.category === "queso");
  let productGuayaQueso = listProduct.filter(
    (prod) => prod.category === "guayabaqueso"
  );
  let productNutella = listProduct.filter(
    (prod) => prod.category === "nutella"
  );
  let productMix = listProduct.filter((prod) => prod.category === "mix");

  return (
    <div>
      {/* barra de navegación que luego se debe pasar a componente */}
      <div className="bar">
        <img src={imgLogo} alt="logotrs" />
        <div className="navbtn">
          <Link to="/home" className="link">
            Inicio
          </Link>
          <span>Productos ({orderCount})</span>
          <Link onClick={logout} className="link">
            Salir
          </Link>
        </div>
      </div>

      {/* contenedor de lista de precios y detalles del pedido */}
      <div className="container-top">
        {/* lista de precios con pestañas */}
        <div className="priceList">
          {/* pestañas de la lista de precios */}
          <Nav tabs>
            <NavItem>
              <NavLink
                className={activeTab === "1" ? "activeTab1 baseTab" : "baseTab"}
                onClick={() => changeTab("1")}
              >
                Queso
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeTab === "2" ? "activeTab2 baseTab" : "baseTab"}
                onClick={() => changeTab("2")}
              >
                Guayaba con Queso
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "3" ? "activeTab3 baseTab" : "baseTab"}
                onClick={() => changeTab("3")}
              >
                Nutella
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "4" ? "activeTab4 baseTab" : "baseTab"}
                onClick={() => changeTab("4")}
              >
                Combinado
              </NavLink>
            </NavItem>
          </Nav>
          {/* contenido de la lista de precios */}
          <TabContent activeTab={activeTab}>
            {/* contenido de la tab 1 */}
            <TabPane tabId="1">
              <div className="container">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productQueso.map((prod, index) => {
                      return (
                        <tr key={index}>
                          <td>{prod.name}</td>
                          <td>{prod.cantidad}</td>
                          <td>{prod.price}</td>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleCheckboxChange(
                                  e,
                                  prod.name,
                                  prod.cantidad,
                                  prod.price
                                )
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabPane>
            {/* contenido de la tab 2 */}
            <TabPane tabId="2">
              <div className="container">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productGuayaQueso.map((prod, index) => {
                      return (
                        <tr key={index}>
                          <td>{prod.name}</td>
                          <td>{prod.cantidad}</td>
                          <td>{prod.price}</td>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleCheckboxChange(
                                  e,
                                  prod.name,
                                  prod.cantidad,
                                  prod.price
                                )
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabPane>
            {/* contenido tab 3 */}
            <TabPane tabId="3">
              <div className="container">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productNutella.map((prod, index) => {
                      return (
                        <tr key={index}>
                          <td>{prod.name}</td>
                          <td>{prod.cantidad}</td>
                          <td>{prod.price}</td>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleCheckboxChange(
                                  e,
                                  prod.name,
                                  prod.cantidad,
                                  prod.price
                                )
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabPane>
            {/* contenido tab 4 */}
            <TabPane tabId="4">
              <div className="container">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Seleccionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productMix.map((prod, index) => {
                      return (
                        <tr key={index}>
                          <td>{prod.name}</td>
                          <td>{prod.cantidad}</td>
                          <td>{prod.price}</td>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                handleCheckboxChange(
                                  e,
                                  prod.name,
                                  prod.cantidad,
                                  prod.price
                                )
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </TabPane>
          </TabContent>
        </div>
        {/* detalles del pedido con boton de agregado */}
        <div className="priceDetails">
          <h3>Detalles del pedido</h3>
          <div className="details">
            <label>Crudos</label>
            <input
              type="checkbox"
              checked={isCrudoSelected}
              onChange={() => setIsCrudoSelected(!isCrudoSelected)}
            />
          </div>
          <div className="details">
            <label>Fritos</label>
            <input
              className="frito"
              type="checkbox"
              checked={isFritoSelected}
              onChange={() => setIsFritoSelected(!isFritoSelected)}
            />
          </div>
          <button className="btnDetails" onClick={addToOrder}>
            Agregar a tu pedido
          </button>
        </div>
      </div>
      {/* detalle de la orden actual que el cliente va seleccionando en la parte de arriba */}
      <div>
        <div className="containerOrder">
          <h4>Detalles de la Orden</h4>
          {orderDetails.map((orderDetails, orderIndex) => (
            <div key={orderIndex} className="pedido-detalle">
              {orderDetails.products.map((product, index) => (
                <p
                  key={index}
                >{`${product.name} // Cantidad: ${product.quantity} // Precio: ${product.price}`}</p>
              ))}
              <div>
                {orderDetails.isCrudo && <p>Crudos</p>}
                {orderDetails.isFrito && <p>Fritos</p>}
              </div>
              <button
                className="btnDelete"
                onClick={() => removeOrder(orderIndex)}
              >
                Borrar
              </button>
            </div>
          ))}
        </div>
      </div>
      <br />
      <button className="btnFinalOrder" onClick={finishOrder}>
        Finalizar Orden
      </button>
    </div>
  );
};

export default HomePagetest;
