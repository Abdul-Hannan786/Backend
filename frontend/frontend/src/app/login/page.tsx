"use client";
import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="p-5 flex gap-3">
      <input
        type="email"
        placeholder="Enter Your Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Your Password"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="border rounded bg-blue-500 px-10 text-white"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
