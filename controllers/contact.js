const sendEmail = async (transporter, output) => {
  return await transporter.sendMail({
      to: process.env.BRAD_EMAIL,
      subject: "Contact Request",
      text: "Hello world?", // plain text body
      html: output
  })
}

const handleContact = nodemailer => (req, res) => {
  const { name, email, message } = req.body;
  if (name && email && message ) {
    const output = `
      <p>New contact request!</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name : ${name}</li>
        <li>Email : ${email}</li>
      </ul>
      <h3>Message:</h3>
      <p>${message}</p>`;
    let transporter = nodemailer.createTransport({
      service: 'mailgun',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
    sendEmail(transporter, output).then(info => {
      console.log("Message sent: %s", info);
      res.status(200).json('success')
    })
    .catch(err => {
      console.error(err);
      res.status(500).json("fail");
    })
  } else {
    res.status(500).json("fail");
  }
}

module.exports = {
  handleContact: handleContact
}