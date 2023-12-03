import React, { useState, useEffect } from "react";
import { useAuthContext } from "../customHooks/useAuthContext";

function FindFriends() {
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [relativeList, setRelativeList] = useState([]);
  const [noUserFound, setNoUserFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthContext();

  console.log(searchList, searchList.length === 0)

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(search);

    if (!user) {
      alert("You must be logged in");
      return;
    } else {
      try {
        setLoading(true);
        const response = await fetch("/api/user/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            name: search,
          }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
    
          const json = await response.json();
        if (json.length === 0) {
            setSearchList([]);
            setNoUserFound(true);
        } else {
          setSearchList([
            ...searchList,
            ...json.map((user) => ({ name: user.name, email: user.email })),
          ]);
          setNoUserFound(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const addFriend = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/user/list", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await res.json();
      if (res.ok) {
        setRelativeList([
          ...relativeList,
          ...json.map((user) => ({ name: user.name, email: user.email })),
        ]);
      }
    };
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="friends">
      <div className="contents">
        <form className="search mb-5" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button className="btn">Find</button>
        </form>

        <div className="friend-list">
          {loading && <p className="mb-4 center">Loading...</p>}
          {noUserFound && <p className="mb-4 center">No user found</p>}
          {searchList.length !== 0 && (
            <>
              <h2 className="mb-4">Search result for {searched}</h2>
              {searchList.map((user, index) => (
                <div key={index} className="friend-card">
                  <div className="card-content">
                    <div className="user-dp">
                      <img
                        src="https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg"
                        alt="Person"
                        height="60"
                        width="60"
                      />
                    </div>
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <button onClick={addFriend}>
                    <span className="material-symbols-rounded">person_add</span>
                  </button>
                </div>
              ))}
            </>
          )}
        </div>
        {searchList.length === 0 && (
          <div className="relative-list">
            <h2 className="mb-4">People you may know</h2>
            {relativeList &&
              relativeList.map((user, index) => (
                <div key={index} className="friend-card">
                  <div className="card-content">
                    <div className="user-dp">
                      <img
                        src="https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg"
                        alt="Person"
                        height="60"
                        width="60"
                      />
                    </div>
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <button onClick={addFriend}>
                    <span className="material-symbols-rounded">person_add</span>
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindFriends;
