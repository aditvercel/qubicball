"use client";
import Signupscreen from "@/components/Signupscreen";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [errmessage, Seterrmessage] = useState();
  const [lihat, setLihat] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  console.log(lihat);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLihat((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://task.amidin.site/auth/signin", lihat)
      .then((response) => {
        // Handle the response as needed
        Seterrmessage(false);
        console.log(response);
        router.push("/signin");
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        Seterrmessage(error.response.statusText);
      });
  };

  return (
    <>
      <Signupscreen
        Title={"Signup"}
        Name={true}
        Password={true}
        Email={true}
        UserName={true}
        onChange={handleChange}
        onClick={handleSubmit}
        errmessage={errmessage}
      />
    </>
  );
}
