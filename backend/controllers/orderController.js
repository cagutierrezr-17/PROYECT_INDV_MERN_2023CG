import finalOrder from "../models/orderProductModel.js";
import nodemailer from "nodemailer";

const createOrder = async (req, res) => {
  try {
    let orderData = req.body;
    let newOrder = await finalOrder.create(orderData);

    res.status(200).json(newOrder);
  } catch (e) {
    console.log(e);
  }
};

const sendEmailOrder = async (req, res) => {
  const { products, totalAmount } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
      auth: {
        user: "",
        pass: "",
      },
    });

    let mailOptions = {
      from: "cl.turinconsabroso@gmail.com",
      to: "cl.turinconsabroso@gmail.com",
      subject: "Pedido generado",
      html: `<p>Detalles del pedido:</p>
      <ul>
        ${
          Array.isArray(products) && products.length > 0
            ? products.map((order) =>
                order.products
                  .map(
                    (product) =>
                      `<li>${product.name} - Cantidad: ${product.quantity} - Precio: ${product.price}</li>`
                  )
                  .join("")
              )
            : ""
        }
      </ul>,
      <p>Total del Pedido: $${totalAmount}</p>`,
    };

    let result = await transporter.sendMail(mailOptions);

    res.json(result);
  } catch (error) {
    console.log("Error al enviar el correo: ", error);
  }
};

export { createOrder, sendEmailOrder };
