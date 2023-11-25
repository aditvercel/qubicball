"use client";
import Cookies from "js-cookie";
import Signupscreen from "@/components/Signupscreen";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [lihat, setLihat] = useState("");
  const [errmessage, Seterrmessage] = useState();

  const handleChange = (e) => {
    setLihat((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://task.amidin.site/auth/signin", lihat)
      .then((response) => {
        // Handle the response as needed
        Seterrmessage(false);
        const token = response.data.token;
        const user = response.data.user;

        Cookies.set("accessToken", token);
        Cookies.set("user", JSON.stringify(user));

        console.log(response);
        router.push("/Dashboard");
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
        Email={true}
        Password={true}
        Title={"Signin"}
        onChange={handleChange}
        onClick={handleSubmit}
        errmessage={errmessage}
      />
    </>
  );
}
