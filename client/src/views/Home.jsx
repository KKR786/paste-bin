import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../customHooks/useAuthContext";

function Home() {
  const [paste, setPaste] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [expiration, setExpiration] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      localStorage.setItem(
        "Paste",
        JSON.stringify({
          paste,
          title,
          category,
          expiration,
          privacy,
          password,
        })
      );
      return window.location.replace("/login");
    } else {
      try {
        const response = await fetch("/api/paste/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            paste,
            title,
            category,
            expiration,
            privacy,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        if (response.ok) {
          const json = await response.json();
          localStorage.removeItem("Paste");
          setSuccess("New Paste Created");
          setPaste("");
          setTitle("");
          setCategory("");
          setExpiration("");
          setPrivacy("");
          setPassword("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="home">
      <div className="left">
        <h3 className="mb-3">New Paste</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="paste"
            value={
              localStorage.getItem("Paste") !== null
                ? JSON.parse(localStorage.getItem("Paste")).paste
                : paste
            }
            id="paste"
            cols="30"
            rows="10"
            onChange={(e) => setPaste(e.target.value)}
            required
          ></textarea>
          <div className="optional mt-3">
            <h3>Optional Settings</h3>
            <div className="input-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                value={
                  localStorage.getItem("Paste") !== null
                    ? JSON.parse(localStorage.getItem("Paste")).title
                    : title
                }
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                name="category"
                value={
                  localStorage.getItem("Paste") !== null
                    ? JSON.parse(localStorage.getItem("Paste")).category
                    : category
                }
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="expiration">Expiration:</label>
              <input
                type="text"
                name="expiration"
                value={
                  localStorage.getItem("Paste") !== null
                    ? JSON.parse(localStorage.getItem("Paste")).expiration
                    : expiration
                }
                onChange={(e) => setExpiration(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="privacy">Privacy:</label>
              <select
                name="privacy"
                value={
                  localStorage.getItem("Paste") !== null
                    ? JSON.parse(localStorage.getItem("Paste")).privacy
                    : privacy
                }
                onChange={(e) => setPrivacy(e.target.value)}
                required
              >
                <option value="1">Public</option>
                <option value="0">Private</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="catagory">Password:</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="pasteBtn">
              <button className="btn">Create New Paste</button>
            </div>
          </div>
        </form>
        {success && <p>{success}</p>}
      </div>
      <div className="right">
        <h3 className="mb-3">Public Pastes</h3>
        <ul>
          <li>Paste Name</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
