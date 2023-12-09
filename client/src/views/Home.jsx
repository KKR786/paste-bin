import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../customHooks/useAuthContext";

function Home() {
  const [paste, setPaste] = useState(
    localStorage.getItem("Paste") !== null
      ? JSON.parse(localStorage.getItem("Paste")).paste
      : ""
  );
  const [title, setTitle] = useState(
    localStorage.getItem("Paste") !== null
      ? JSON.parse(localStorage.getItem("Paste")).title
      : ""
  );
  const [category, setCategory] = useState(
    localStorage.getItem("Paste") !== null
      ? JSON.parse(localStorage.getItem("Paste")).category
      : ""
  );
  const [expiration, setExpiration] = useState(
    localStorage.getItem("Paste") !== null
      ? JSON.parse(localStorage.getItem("Paste")).expiration
      : ""
  );
  const [privacy, setPrivacy] = useState(
    localStorage.getItem("Paste") !== null
      ? JSON.parse(localStorage.getItem("Paste")).privacy
      : 1
  );
  const [password, setPassword] = useState(
    localStorage.getItem("Paste") !== null
      ? JSON.parse(localStorage.getItem("Paste")).password
      : ""
  );
  const [success, setSuccess] = useState("");

  const [publicPastes, setPublicPastes] = useState([]);

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

  useEffect(() => {
    const fetchPastes = async () => {
      const res = await fetch("/api/paste/public/list", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await res.json();
      if (res.ok) {
        setPublicPastes([
          ...publicPastes,
          ...json.map((paste) => ({
            title: paste.title,
            category: paste.category,
            user_name: paste.user_id.name,
          })),
        ]);
      }
    };
    if (user) {
      fetchPastes();
    }
  }, [user]);
  return (
    <div className="home">
      <div className="left">
        <h3 className="mb-3">New Paste</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            name="paste"
            value={paste}
            placeholder={
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
                value={title}
                name="title"
                placeholder={
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
                value={category}
                placeholder={
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
                value={expiration}
                placeholder={
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
                value={privacy}
                placeholder={
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
                value={password}
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
        {publicPastes.map((paste, index) => (
          <div key={index} className="paste-card">
            <div className="paste-card-content">
              <span className="material-symbols-rounded">public</span>
              <div className="paste-card-details">
                <h4>{paste.title}</h4>
                <div className="paste-card-info">
                  <span>{paste.user_name}</span>
                  <span>{paste.category}</span>
                </div>
              </div>
            </div>
            <Link to=''>
              <span class="material-symbols-rounded">double_arrow</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
