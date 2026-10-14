function Contact({ email, phone }) {
  return (
    <section>
      <h2>Contact Me</h2>
      <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
      <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
    </section>
  );
}

export default Contact;