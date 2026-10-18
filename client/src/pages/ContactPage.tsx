import { useNavigate } from 'react-router-dom'
import './ContactPage.css'
function ContactPage() {
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/')
  }

  return (
<main className="contact">
    <h1>Contact Me</h1>

      <section>
        <h2>Get in Touch</h2>

        <p>Toronto, Ontario</p>
        <p>Phone: 647-509-4142</p>
        <p>Email: khadra.hersi12@gmail.com</p>
      </section>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" required />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" required />
        </div>

        <div>
          <label htmlFor="phone">Contact Number</label>
          <input id="phone" name="phone" type="tel" required />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} required />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </main>
  )
}

export default ContactPage