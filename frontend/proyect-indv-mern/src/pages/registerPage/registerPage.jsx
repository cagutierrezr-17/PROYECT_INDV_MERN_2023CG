import imgLogo from "../img/tu_rincon_sabroso_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./registerPage.css";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // estado para calcular edad el ingresar el registro
  const [age, setAge] = useState(null);

  // metodo para navegar hacia otra pagina que yo determine
  const navigate = useNavigate();

  // metodo para calcular la edad el modificar el input date
  useEffect(() => {
    if (birthDate) {
      const ageObj = new Date(birthDate);
      const actualDate = new Date();
      const ageSubstract = actualDate - ageObj;
      const calculateAge = Math.floor(
        ageSubstract / (1000 * 60 * 60 * 24 * 365.25)
      );

      setAge(calculateAge);
    } else {
      setAge(null);
    }
  }, [birthDate]);

  const userRegister = async () => {
    // se realiza la validación de completación del formulario
    if (
      name === "" ||
      lastName === "" ||
      mail === "" ||
      phone === "" ||
      address === "" ||
      city === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Por favor complete el formulario de registro");
      return;
    }
    // se realiza la validación de ser mayor de edad para poder registrarse
    if (age !== null && age < 18) {
      alert("Debes ser mayor de edad para registrarte");
      return;
    }
    //se realiza la validación de que las contraseñas deben coincidir para poder registrarse
    if (password !== confirmPassword) {
      alert("Las contraseñas deben ser iguales");
      return;
    }

    // metodo de llamado al endpotin y almacenamiento en la base de datos de los datos capturados
    try {
      let userObjet = {
        firstname: name,
        lastname: lastName,
        birthDate: age,
        email: mail,
        phone: phone,
        address: address,
        addressDetail: addressDetail,
        city: city,
        password: password,
      };
      let responseUser = await axios.post(
        "http://localhost:8000/api/register",
        userObjet
      );
      console.log(userObjet);
      if (responseUser.status !== 200) {
        alert("Hubo un error al registrar el usuario");
        return;
      }
      alert("El usuario ha sido registrado exitosamente");
      setName("");
      setLastName("");
      setBirthDate("");
      setMail("");
      setPhone("");
      setAddress("");
      setAddressDetail("");
      setCity("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (e) {
      alert("Correo ya existe en la base de datos " + e.response.data.message);
      console.log(e);
    }
  };

  // metodo para prevenir la recarga de la pagina en el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* barra de navegación */}
      <div className="bar">
        <img src={imgLogo} alt="logotrs" />
        <div className="navbtn">
          <span>Tienes cuenta?</span>
          <Link to="/login" className="ingresa">
            Ingresa
          </Link>
        </div>
      </div>
      {/* formulario de registro */}
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            className="text"
            type="text"
            placeholder="Nombres"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="text"
            type="text"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <input
            className="text"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          {/* condicional para mostrar la edad cuando se ingrese un valor en la etiqueta label */}
          <label className="age">
            Edad: {age !== null ? age + " años" : " 0 años"}
          </label>
          <br />
          <input
            className="text1"
            type="text"
            placeholder="Correo Electrónico"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <input
            className="text"
            type="text"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <input
            className="text1"
            type="text"
            placeholder="Dirección Completa"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <input
            className="text"
            type="text"
            placeholder="Boque/Edif./Departamento"
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
          />
          <input
            className="text"
            type="text"
            placeholder="Comuna"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <br />
          <input
            className="text1"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            className="text1"
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>
        <button className="btnRegister" onClick={userRegister}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
