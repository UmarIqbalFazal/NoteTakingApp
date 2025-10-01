import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", form);
      localStorage.setItem("token", res.data.token); // save JWT
      toast.success("Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="link link-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
