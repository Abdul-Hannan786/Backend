"use client";

import axios from "axios";
// import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  // const [message, setMessage] = useState("");
  // const [user, setUser] = useState(null);
  
  // const userId = "dynamic-user-id";
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.get(`${NEXT_PUBLIC_BASE_URL}/profile/${userId}`);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch user data");
  //     }
  //   };

  //   fetchProfile();
  // }, [userId]);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data.data.profilePic);
      // setUser(response.data.data)
      setMessage(response.data.message);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setMessage("Failed to upload image");
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {/* {message && <p>{message}</p>} */}
      {/* {user.profilePic && <Image className="mt-10" src={user.profilePic} alt="Uploaded Image" width={150} height={150} />} */}
    </div>
  );
}
