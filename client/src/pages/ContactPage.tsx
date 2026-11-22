
import { useEffect, useState, type FormEvent } from "react";
import { apiRequest } from "../api";
import "./ContactPage.css";

interface Contact {
  _id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  message: string;
}

const emptyForm = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  message: ""
};

function ContactPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === "Admin";

  const [form, setForm] = useState(emptyForm);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  const loadContacts = async () => {
    if (!isAdmin) return;

    try {
      const data = await apiRequest("/api/contacts");
      setContacts(data);
    } catch {
      setStatus("Could not load messages.");
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (editing) {
        await apiRequest(`/api/contacts/${editing}`, {
          method: "PUT",
          body: JSON.stringify(form)
        });
        setStatus("Message updated!");
      } else {
        await apiRequest("/api/contacts", {
          method: "POST",
          body: JSON.stringify(form)
        });
        setStatus("Message sent successfully!");
      }

      setForm(emptyForm);
      setEditing(null);
      loadContacts();
    } catch {
      setStatus("Could not send or update message.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await apiRequest(`/api/contacts/${id}`, { method: "DELETE" });
      setStatus("Message deleted!");
      loadContacts();
    } catch {
      setStatus("Could not delete message.");
    }
  };

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
        <h2>{editing ? "Edit Message" : "Send a Message"}</h2>

        <label htmlFor="firstName">First Name</label>
        <input id="firstName" value={form.firstname}
          onChange={e => setForm({...form, firstname: e.target.value})} required />

        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" value={form.lastname}
          onChange={e => setForm({...form, lastname: e.target.value})} required />

        <label htmlFor="phone">Contact Number</label>
        <input id="phone" type="tel" value={form.phone}
          onChange={e => setForm({...form, phone: e.target.value})} required />

        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} required />

        <label htmlFor="message">Message</label>
        <textarea id="message" rows={5} value={form.message}
          onChange={e => setForm({...form, message: e.target.value})} required />

        <button type="submit">
          {editing ? "Update Message" : "Send Message"}
        </button>

        {editing && (
          <button type="button" onClick={() => {
            setEditing(null);
            setForm(emptyForm);
          }}>
            Cancel
          </button>
        )}
      </form>

      <p>{status}</p>

      {isAdmin && (
        <section>
          <h2>Submitted Messages (Admin)</h2>

          {contacts.map(contact => (
            <article key={contact._id}>
              <h3>{contact.firstname} {contact.lastname}</h3>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
              <p>Message: {contact.message}</p>

              <button onClick={() => {
                setEditing(contact._id);
                setForm({
                  firstname: contact.firstname,
                  lastname: contact.lastname,
                  phone: contact.phone,
                  email: contact.email,
                  message: contact.message
                });
              }}>
                Edit
              </button>

              <button onClick={() => handleDelete(contact._id)}>
                Delete
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default ContactPage;
