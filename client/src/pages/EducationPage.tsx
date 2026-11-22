
import { useEffect, useState, type FormEvent } from "react";
import { apiRequest } from "../api";
import "./EducationPage.css";

interface Education {
  _id: string;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  completionDate: string;
  description: string;
}

const emptyForm = {
  title: "",
  firstname: "",
  lastname: "",
  email: "",
  completionDate: "",
  description: ""
};

function EducationPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === "Admin";

  const [records, setRecords] = useState<Education[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const loadRecords = async () => {
    try {
      const data = await apiRequest("/api/educations");
      setRecords(data);
    } catch {
      setMessage("Could not load education records.");
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (editing) {
        await apiRequest(`/api/educations/${editing}`, {
          method: "PUT",
          body: JSON.stringify(form)
        });
        setMessage("Education updated!");
      } else {
        await apiRequest("/api/educations", {
          method: "POST",
          body: JSON.stringify(form)
        });
        setMessage("Education added!");
      }

      setForm(emptyForm);
      setEditing(null);
      loadRecords();
    } catch {
      setMessage("Could not save education.");
    }
  };

  const handleEdit = (record: Education) => {
    setEditing(record._id);
    setForm({
      title: record.title,
      firstname: record.firstname,
      lastname: record.lastname,
      email: record.email,
      completionDate: record.completionDate.slice(0, 10),
      description: record.description
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this education record?")) return;

    try {
      await apiRequest(`/api/educations/${id}`, { method: "DELETE" });
      setMessage("Education deleted!");
      loadRecords();
    } catch {
      setMessage("Could not delete education.");
    }
  };

  return (
    <main className="education">
      <h1>Education</h1>

      <section>
        <h2>Centennial College</h2>
        <h3>
          Software Engineering Technology – Artificial Intelligence (Co-op)
        </h3>
        <p>2025 – Present</p>
        <p>Expected Graduation: April 2028</p>
        <p>
          Relevant Courses: C# Programming, Java Programming, Software
          Engineering Fundamentals, Software Requirements, Introduction to
          Database Concepts, and Client-Side Web Development.
        </p>
      </section>

      <hr />
      <h2>Education Records</h2>

      {records.map(record => (
        <section key={record._id}>
          <h3>{record.title}</h3>
          <p>{record.description}</p>
          <p>By: {record.firstname} {record.lastname}</p>
          <p>
            Completed: {record.completionDate
              ? record.completionDate.slice(0, 10)
              : "Not specified"}
          </p>

          {isAdmin && (
            <>
              <button onClick={() => handleEdit(record)}>Edit</button>
              <button onClick={() => handleDelete(record._id)}>Delete</button>
            </>
          )}
        </section>
      ))}

      {isAdmin && (
        <section>
          <h2>{editing ? "Edit Education" : "Add Education"}</h2>

          <form onSubmit={handleSubmit}>
            <input placeholder="Title" value={form.title}
              onChange={e => setForm({...form, title: e.target.value})} required />

            <input placeholder="First name" value={form.firstname}
              onChange={e => setForm({...form, firstname: e.target.value})} required />

            <input placeholder="Last name" value={form.lastname}
              onChange={e => setForm({...form, lastname: e.target.value})} required />

            <input type="email" placeholder="Email" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} required />

            <input type="date" value={form.completionDate}
              onChange={e => setForm({...form, completionDate: e.target.value})} required />

            <textarea placeholder="Description" value={form.description}
              onChange={e => setForm({...form, description: e.target.value})} required />

            <button type="submit">
              {editing ? "Update Education" : "Add Education"}
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
        </section>
      )}

      <p>{message}</p>
    </main>
  );
}

export default EducationPage;
