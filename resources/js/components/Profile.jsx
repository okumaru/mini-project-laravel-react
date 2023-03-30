import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

const logout = async () => {
  const req = await fetch("http://localhost:8000/logout", { 
    method: "POST", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({_token: csrf_token}),
  });

  if (req.status === 200) {
    window.location.replace("/login");
  }
}

export default function Profile() {

  const [isOpen, setOpen] = useState("");
  const [dataProfile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const req = await fetch(`${window.location.origin}/api/user`, { 
        method: "GET", 
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json", 
          "Authorization": csrf_token
        },
      });
      
      if (req.status !== 200) {
        return null
      }
      
      setProfile(await req.json());
    }

    getProfile().catch(console.error);
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      {/* Topbar Navbar */}
      <ul className="navbar-nav ml-auto">
        {/* Nav Item - User Information */}
        <li className={`nav-item dropdown no-arrow ${isOpen}`}>
          <a onClick={() => setOpen( isOpen === 'show' ? '' : 'show' )} className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{dataProfile?.name}</span>
            <img className="img-profile rounded-circle" src="storage/images/undraw_profile.svg" />
          </a>
          {/* Dropdown - User Information */}
          <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${isOpen}`} aria-labelledby="userDropdown">
            <a onClick={logout} className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
          </div>
        </li>
      </ul>

    </nav>
  );
}

if (document.getElementById("profile")) {
  const Index = ReactDOM.createRoot(document.getElementById("profile"));
  Index.render(
    <React.StrictMode>
      <Profile />
    </React.StrictMode>
  );
}
