import { Link, useNavigate, useLocation } from "react-router-dom";
import imgLogo from "../img/tu_rincon_sabroso_logo.png";
import { useEffect, useState } from "react";
import axios from "axios";
import "./orderPage.css";

const OderPage = () => {
  // estado para verificar el monto total del pedido
  const [totalAmount, setTotalAmount] = useState(0);

  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    let isLogged = localStorage.getItem("Logged");
    if (isLogged === null) {
      navigate("/login");
    }
  });

  const logout = () => {
    localStorage.removeItem("Logged");
    navigate("/login");
  };

  const homePage = () => {
    navigate("/home");
  };

  //   verificando que hayan pedidos en la ubicación
  const orderDetails = state && state.orderDetails ? state.orderDetails : [];

  // pasando el conteo de ordenes al link
  const orderCount = state && state.orderCount ? state.orderCount : 0;

  useEffect(() => {
    // Calcula el monto total al cargar el componente o cuando cambian los detalles del pedido
    let total = 0;
    orderDetails.forEach((order) => {
      order.products.forEach((product) => {
        total += parseFloat(product.price);
      });
    });
    // formateo del total del pedido a dos decimales
    const formattedTotal = total.toFixed(1);
    setTotalAmount(formattedTotal);
  }, []);

  // metodo para enviar la orden final a la base de datos

  const sendOrderAndEmail = async () => {
    try {
      // Verificar si hay detalles de la orden
      if (orderDetails.length === 0) {
        alert("No hay orden para enviar");
        return;
      }

      // Datos de la orden
      const orderData = {
        products: orderDetails,
        isCrudo: orderDetails.some((order) => order.isCrudo),
        isFrito: orderDetails.some((order) => order.isFrito),
        totalAmount: totalAmount,
      };

      console.log(orderData);

      // Enviar la orden al backend
      const orderResponse = await axios.post(
        "http://localhost:8000/api/createFinalOrder",
        orderData
      );
      console.log("Order Response:", orderResponse.data);

      // Enviar el correo desde el frontend
      const emailResponse = await axios.post(
        "http://localhost:8000/api/finalOder/email",
        orderData
      );
      console.log("Email Response:", emailResponse.data);

      alert("Orden enviada exitosamente");

      // Redirigir a la página de inicio
      navigate("/home", { state: { orderDetails: [], orderCount: 0 } });
    } catch (error) {
      console.log("Error al enviar la orden o el correo:", error);
      alert("Error al enviar la orden");
    }
  };

  return (
    <div>
      {/* barra de navegación de la pagina oder */}
      <div className="bar">
        <img src={imgLogo} alt="logotrs" />
        <div className="navbtn">
          <Link className="link" to="/home">
            Inicio
          </Link>
          <span>Productos ({orderCount})</span>
          <Link className="link" onClick={logout}>
            Salir
          </Link>
        </div>
      </div>
      {/* codigo para mostrar el pedido seleccionado en la pagina home */}
      <div className="orderDetail">
        <h2 className="title">Detalles de la Orden</h2>
        <p className="total">Total del Pedido: ${totalAmount}</p>
        {orderDetails.length > 0 ? (
          <div>
            {/* Muestra los detalles del pedido */}
            {orderDetails.map((order, index) => (
              <div className="detailOrder" key={index}>
                {order.products.map((product, pIndex) => (
                  <p key={pIndex}>
                    {`${product.name} // Cantidad: ${product.quantity} // Precio Individual: ${product.price}`}
                  </p>
                ))}
                {order.isCrudo && <p className="estado">Crudos</p>}
                {order.isFrito && <p className="estado">Fritos</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>No hay detalles de pedido disponibles.</p>
        )}
      </div>
      <div>
        <button className="btnReturn" onClick={homePage}>
          Regresar
        </button>
        <button className="btnSend" onClick={sendOrderAndEmail}>
          Enviar pedido
        </button>
      </div>
    </div>
  );
};

export default OderPage;
