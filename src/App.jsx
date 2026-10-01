import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Generate simulated JWT
  function generateToken() {
    const header = btoa(JSON.stringify({
      alg: "HS256",
      typ: "JWT"
    }));

    const payload = btoa(JSON.stringify({
      userId: 101,
      role: "Admin"
    }));

    const signature = "simulated-signature";

    return `${header}.${payload}.${signature}`;
  }

  function handleLogin(e) {
    e.preventDefault();

    // Demo authentication
    if (username === "admin" && password === "1234") {
      const newToken = generateToken();

      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      alert("Invalid username or password");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  // Protected Dashboard
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));

    return (
      <div>
        <h1>Dashboard</h1>

        <p>User ID: {payload.userId}</p>
        <p>Role: {payload.role}</p>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }

  // Login page
  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>Username: admin</p>
      <p>Password: 1234</p>
    </div>
  );
}

export default App;