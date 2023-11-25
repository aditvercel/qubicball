"use client";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Cookies from "js-cookie";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

export default function Card({ id }) {
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState();
  console.log(save);

  const handleEdit = () => {
    setEdit((prev) => !prev);
  };
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setSave((prev) => ({ ...prev, [name]: value !== "on" ? value : checked }));
  };
  const handleDelete = () => {
    const token = Cookies.get("accessToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(`https://task.amidin.site/task/${id}`, config) // Corrected to use DELETE request
        .then((response) => {
          console.log("Item deleted successfully");
          // Optionally, you can update your UI or perform other actions here
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
          // Handle error, show a message, or perform other actions as needed
        });
    } else {
      console.error("No access token available");
      // Handle the case where the token is not available (e.g., user is not authenticated)
    }
  };

  const handleSave = () => {
    const token = Cookies.get("accessToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .patch(`https://task.amidin.site/task/${id}`, save, config)
        .then((response) => {
          console.log("Item updated successfully");
          // Optionally, you can update your UI or perform other actions here
        })
        .catch((error) => {
          console.error("Error updating item:", error);
          // Handle error, show a message, or perform other actions as needed
        });
    } else {
      console.error("No access token available");
      // Handle the case where the token is not available (e.g., user is not authenticated)
    }
  };

  return (
    <div className="border border-black w-30 h-[300px] p-5 overflow-hidden rounded-lg shadow-sm shadow-black relative">
      {edit ? (
        <>
          <div>Editing mode content</div>
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            name="name"
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="description"
            variant="standard"
            name="description"
            onChange={handleChange}
          />
          <Switch
            name="is_complete"
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <div className="flex gap-32 absolute bottom-0 w-full">
            <button onClick={() => setEdit(false)}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center align-middle mb-10 text-lg font-medium">
            Judul TODOS
          </div>
          <div>
            Description: dasdasdas dasdsasadsa asdasdsaddsadasdsadasdasdas
          </div>
          <div className="flex justify-between top-24 relative">
            <button onClick={handleDelete}>
              <DeleteIcon sx={{ color: "red" }} />
            </button>
            <button onClick={handleEdit}>
              <EditIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
