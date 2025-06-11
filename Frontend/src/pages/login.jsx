import { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, pass);
  };

  function checkPassword() {}

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your Email"
            required
          />
          <br />
          <input
            type="password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            placeholder="Enter your Password"
            required
          />
          <br />
          <p>{err}</p>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}

export default Login;
