import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// importación archivo css
import "./loginPage.css";
// importación de logos e imagenes
import imgLogo from "../img/tu_rincon_sabroso_logo.png";
import instaLogo from "../img/instagram.png";
import wspLogo from "../img/wsp.png";

const LoginPage = () => {
  // manejo de estados del login
  const [mailLogin, setMailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const navigate = useNavigate();

  // metodo para poder hacer login y redirigir a la pagina home
  const userLogin = async () => {
    // validaciones de completado de formulario
    if (mailLogin === "" || passwordLogin === "") {
      alert("Por favor complete el formulario de ingreso");
      return;
    }

    let loginObject = {
      email: mailLogin,
      password: passwordLogin,
    };
    let resultLogin = await axios.post(
      "http://localhost:8000/api/login",
      loginObject
    );
    // valido si el correo o la contraseña estan bien ingresadas y si existen de manera correcta en la base de datos
    if (resultLogin.data === false) {
      alert("Correo o contraseña son incorrectos");
      return;
    }

    localStorage.setItem("Logged", true);

    navigate("/home");
  };

  return (
    <div>
      {/* barra de navegación */}
      <div className="bar">
        <img src={imgLogo} alt="logotrs" />
        <div className="navbtn">
          <span>No Tienes cuenta?</span>
          <Link to="/" className="register">
            Registrate
          </Link>
        </div>
      </div>
      {/* Formulario de login */}
      <div>
        <form className="form">
          <input
            className="text1"
            type="text"
            placeholder="Correo electrónico"
            value={mailLogin}
            onChange={(e) => setMailLogin(e.target.value)}
          />
          <br />
          <input
            className="text1"
            type="password"
            placeholder="Contraseña"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
        </form>
        <button className="btnIngresa" onClick={userLogin}>
          Ingresar
        </button>
        <div className="contac">
          <a
            href="https://www.instagram.com/turinconsabroso/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instaLogo} alt="instalogo" className="insta" />
          </a>
          <a
            href="https://wa.me/56945956403?text=Hola%20deseo%20conocer%20mas%20de%20sus%20productos"
            target="_blank"
            rel="noreferrer"
          >
            <img src={wspLogo} alt="wsplogo" className="wsp" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
