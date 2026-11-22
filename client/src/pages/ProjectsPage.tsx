
import { useEffect, useState, type FormEvent } from "react";
import { apiRequest } from "../api";

interface Project {
  _id: string;
  title: string;
  firstname: string;
  lastname: string;
  email: string;
  completionDate: string;
  description: string;
}

function ProjectsPage() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user?.role === "Admin";

  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completionDate: "",
    description: "",
  });

  const loadProjects = async () => {
    try {
      const data = await apiRequest("/api/projects");
      setProjects(data);
    } catch {
      setMessage("Could not load projects.");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (editing) {
        await apiRequest(`/api/projects/${editing}`, {
          method: "PUT",
          body: JSON.stringify(form),
        });
        setMessage("Project updated!");
      } else {
        await apiRequest("/api/projects", {
          method: "POST",
          body: JSON.stringify(form),
        });
        setMessage("Project added!");
      }

      setEditing(null);
      setForm({
        title: "",
        firstname: "",
        lastname: "",
        email: "",
        completionDate: "",
        description: "",
      });
      loadProjects();
    } catch {
      setMessage("Could not save project.");
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project._id);
    setForm({
      title: project.title,
      firstname: project.firstname,
      lastname: project.lastname,
      email: project.email,
      completionDate: project.completionDate.slice(0, 10),
      description: project.description,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await apiRequest(`/api/projects/${id}`, { method: "DELETE" });
      setMessage("Project deleted!");
      loadProjects();
    } catch {
      setMessage("Could not delete project.");
    }
  };

  return (
    <main className="projects">
      <h1>Projects</h1>

      <section className="project">
        <h2>Park Environment Simulation</h2>
        <img src="/Spider.png" alt="Park Environment Simulation" />
        <p>Python • Object-Oriented Programming</p>
        <p>
          Developed a Python-based environment simulation using classes
          to model agent behaviours including movement, eating, drinking,
          and barking.
        </p>
      </section>

      <section className="project">
        <h2>Image Favorites Gallery</h2>
        <img src="/JavaScript.png" alt="Image Favorites Gallery" />
        <p>JavaScript • DOM Manipulation</p>
        <p>
          Created an interactive image gallery using JavaScript.
          Users can open images and manage their favourite images.
        </p>
      </section>

      <section className="project">
        <h2>Video Game Collection Manager</h2>
        <img src="/CSharpOutput.png" alt="Video Game Collection" />
        <p>C# • Object-Oriented Programming</p>
        <p>
          Developed a C# console program to create and manage a list
          of games using classes, validation, and methods.
        </p>
      </section>

      <hr />
      <h2>Database Projects</h2>

      {projects.map((project) => (
        <section className="project" key={project._id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>By: {project.firstname} {project.lastname}</p>
          <p>Completed: {project.completionDate ? project.completionDate.slice(0, 10) : "Not specified"}</p>

          {isAdmin && (
            <>
              <button onClick={() => handleEdit(project)}>Edit</button>
              <button onClick={() => handleDelete(project._id)}>Delete</button>
            </>
          )}
        </section>
      ))}

      {isAdmin && (
        <section>
          <h2>{editing ? "Edit Project" : "Add Project"}</h2>

          <form onSubmit={handleSubmit}>
            <input placeholder="Project title" value={form.title}
              onChange={e => setForm({...form, title: e.target.value})} required />

            <input placeholder="First name" value={form.firstname}
              onChange={e => setForm({...form, firstname: e.target.value})} required />

            <input placeholder="Last name" value={form.lastname}
              onChange={e => setForm({...form, lastname: e.target.value})} required />

            <input type="email" placeholder="Email" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} required />

            <input type="date" value={form.completionDate}
              onChange={e => setForm({...form, completionDate: e.target.value})} required />

            <textarea placeholder="Project description" value={form.description}
              onChange={e => setForm({...form, description: e.target.value})} required />

            <button type="submit">{editing ? "Update Project" : "Add Project"}</button>

            {editing && (
              <button type="button" onClick={() => {
                setEditing(null);
                setForm({
                  title: "", firstname: "", lastname: "",
                  email: "", completionDate: "", description: ""
                });
              }}>Cancel</button>
            )}
          </form>
        </section>
      )}

      <p>{message}</p>
    </main>
  );
}

export default ProjectsPage;
