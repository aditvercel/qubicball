"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

export default function Signupscreen({
  Title,
  UserName,
  Email,
  Name,
  Password,
  onChange,
  onClick,
  errmessage,
}) {
  return (
    <div
      className="p-5 flex items-center justify-center h-screen"
      id="gradient-background"
    >
      <div className="grid w-[550px] gap-5 p-10" id="blur-box">
        <Link href={"/"}>
          <ArrowBackIosIcon />
        </Link>
        <div className="font-bold text-xl">{Title}</div>
        {UserName && (
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            name="username"
            onChange={onChange}
          />
        )}
        {Email && (
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            name={UserName ? "email" : "username_or_email"} // Use lowercase for consistency
            onChange={onChange}
          />
        )}

        {Name && (
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="Name"
            onChange={onChange}
          />
        )}
        {Password && (
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            name="Password"
            onChange={onChange}
          />
        )}
        <div className="grid justify-end">
          <div className=" text-red-500 text-sm mb-3">
            {errmessage && errmessage}
          </div>
          <button
            className="border w-[150px] h-10 bg-yellow-500 rounded-md"
            onClick={onClick}
          >
            {Title} Now
          </button>
        </div>
      </div>
    </div>
  );
}
