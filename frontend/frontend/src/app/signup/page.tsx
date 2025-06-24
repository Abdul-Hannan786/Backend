"use client";
import axios from "axios";
import React, { useState } from "react";
// import { toast } from "react-toastify";

const SignUp = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create`,
        {
          fullname,
          email,
          password,
        }
      );
    
      console.log("Signup successful:", response.data);
    } catch (error) {

      console.error("Signup failed:", error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="p-5 flex gap-3">
      <input
        type="text"
        placeholder="Enter Your Full Name"
        className="border p-2 rounded"
        value={fullname}
        onChange={(e) => {
          setFullname(e.target.value);
        }}
      />
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
        onClick={handleSignUp}
      >
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
