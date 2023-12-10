import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import { useAuthContext } from "../customHooks/useAuthContext";

function Pastes() {
  const [pastes, setPastes] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPastes = async () => {
      const res = await fetch("/api/user/paste/list", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const json = await res.json();
      if (res.ok) {
        setPastes([
          ...pastes,
          ...json.map((paste) => ({
            title: paste.title,
            category: paste.category,
            privacy: paste.privacy
          })),
        ]);
      }
    };
    if (user) {
      fetchPastes();
    }
  }, [user]);
  return (
    <div>
      <h3 className="mb-3">All Pastes</h3>
        {pastes.map((paste, index) => (
          <div key={index} className="paste-card">
            <div className="paste-card-content">
              <span className="material-symbols-rounded">public</span>
              <div className="paste-card-details">
                <h4>{paste.title}</h4>
                <div className="paste-card-info">
                  <span>{paste.category}</span>
                  <span>{paste.privacy === 1 ? 'Public' : 'Private'}</span>
                </div>
              </div>
            </div>
            <Link to=''>
              <span className="material-symbols-rounded">double_arrow</span>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default Pastes
