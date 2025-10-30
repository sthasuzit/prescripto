import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (state === "Sign Up") {
        // Registration
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role: 'customer' // default role for new registrations
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Registration failed');
        }

        // If registration successful, automatically log them in
        setState("Login");
        alert("Registration successful! Please login.");
      } else {
        // Login logic here (we can implement this later)
        // For now, just show an alert
        alert("Login functionality will be implemented soon!");
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            minLength={6}
          />
        </div>
        {error && (
          <p className="text-red-500 text-sm w-full">{error}</p>
        )}
        <button 
          onClick={onSubmitHandler}
          disabled={loading}
          className={`bg-blue-800 text-white w-full py-2 rounded-md text-base ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Please wait...' : (state === "Sign Up" ? "Create Account" : "Login")}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-800 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-800 underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
