import React, { useState, useEffect } from "react";

function FindFriends() {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [relativeList, setRelativeList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="friends">
      <div className="contents">
        <form className="search mb-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          <button className="btn">Find</button>
        </form>
        <div className="friend-list">
          {searchList &&
            searchList.map((item, index) => (
              <div key={index} className="friend-card">
                <img src='' alt="" />
                <h3>{item}</h3>
              </div>
            ))}
        </div>
        <div className="relative-list">
          <h2>People you may know</h2>
          {relativeList &&
            relativeList.map((item, index) => (
              <div key={index} className="friend-card">
                <img src='' alt="" />
                <h3>{item}</h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FindFriends;
