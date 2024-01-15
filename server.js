const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;

  // Настройте транспорт для отправки писем
  const transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // Используйте secure: true для порта 465
    auth: {
      user: "schtern-mail@mail.ru",
      pass: "bGJjdbCki62HfpwXTYv5",
    },
  });

  // Определите содержимое письма
  const mailOptions = {
    from: "schtern-mail@mail.ru",
    to: "schtern-mail@mail.ru", // Укажите свой собственный адрес электронной почты
    subject: "Новая заявка с сайта",
    text: `Имя: ${firstName}\nФамилия: ${lastName}\nНомер телефона: ${phoneNumber}`,
  };

  // Попытка отправки письма
  try {
    // Отправьте письмо
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error sending email:", error);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
