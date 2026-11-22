
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("Creating account...");

  try {
    const response = await fetch("http://localhost:3000/api/users",  {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    setMessage(
      response.ok
        ? "Registration successful! Please log in."
        : data.error || "Registration failed."
    );
  } catch (error) {
    setMessage("Cannot connect to the server. Check that your backend is running.");
  }
};
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Create Account</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
