import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/auth/signup", form);
      toast.success("Account created! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-200 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
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
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
