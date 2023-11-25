"use client";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Card from "@/components/Card";

export default function page() {
  const [data, setData] = useState([1]);
  const [add, setadd] = useState(false);
  const [userInput, setUserInput] = useState();

  const inputchange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  console.log("data", data);

  const handleadd = () => {
    setadd((prev) => !prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddSubmit = () => {
    const token = Cookies.get("accessToken");

    // Check if the token exists before making the request
    if (token) {
      // Set the authorization header in the Axios request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        Body: userInput,
      };

      axios
        .get("https://task.amidin.site/task?sort=id%20DESC", config)
        .then((response) => {
          console.log("response", response.data);
          handleadd();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Handle the case where the token is not available (e.g., user is not authenticated)
      console.error("No access token available");
    }
  };

  useEffect(() => {
    // Retrieve the token from cookies
    const token = Cookies.get("accessToken");

    // Check if the token exists before making the request
    if (token) {
      // Set the authorization header in the Axios request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("https://task.amidin.site/task?sort=id%20DESC", config)
        .then((response) => {
          console.log("response", response.data);
          //   setData(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      // Handle the case where the token is not available (e.g., user is not authenticated)
      console.error("No access token available");
      setError(new Error("No access token available"));
    }
  }, []);
  return (
    <>
      <div className=" flex gap-5 h-full">
        <Sidebar />
        <div>
          <div className=" text-3xl font-semibold">Sticky Notes</div>
          <div className=" border border-green-500 p-5 w-[980px] gap-16 grid grid-cols-3 relative">
            {data &&
              data.map((item) => {
                return <Card id={item.id} />;
              })}
            <button onClick={handleadd}>
              <div className="border border-black w-30 h-[300px] p-5 overflow-hidden rounded-lg shadow-sm shadow-black grid items-center justify-center">
                <div className=" grid justify-center align-middle mb-10 text-lg font-medium text-center items-center">
                  <div> ADD NEW TODOS</div>
                  <div>
                    <AddIcon className=" text-[100px]" />
                  </div>
                </div>
              </div>
            </button>
            {add && (
              <div className=" border absolute top-0 bottom-0 left-0 right-0 m-auto z-20 w-full h-full bg-white p-5 justify-center">
                <div className="text-lg font-bold text-start">ADD TODOS</div>
                <div className="grid justify-center mt-10">
                  <div className="grid gap-5 w-[450px]">
                    <TextField
                      id="standard-basic"
                      label="Title"
                      variant="standard"
                      name="name"
                      onChange={inputchange}
                    />
                    <TextField
                      id="standard-basic"
                      label="Description"
                      variant="standard"
                      name="description"
                      onChange={inputchange}
                    />
                  </div>
                  <div className="flex justify-between mt-20">
                    <button onClick={handleadd}>Cancel</button>
                    <button onClick={handleAddSubmit}>Add</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
