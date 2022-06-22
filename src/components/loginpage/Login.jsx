import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [akmUser, setAkmUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAkmUser();
  }, []);

  const getAkmUser = async () => {
    const res = await axios.get("http://localhost:5000/akmuser");
    setAkmUser(res.data);
    // console.log(res.data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = akmUser.find((user) => user.user_name === username);
    if (user) {
      if (user.user_password === password) {
        navigate("/data");
      } else {
        setError("Password is incorrect");
      }
    } else {
      setError("Username is incorrect");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-7 col-md-6 col-lg-4 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">
                  Masukkan Username dan Password
                </h5>
                <p>{error}</p>
                <form className="mt-4" onSubmit={(e) => handleLogin(e)}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Username"
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <button
                    className="w-100 btn btn-md btn-primary mt-4"
                    type="submit"
                  >
                    Login
                  </button>
                  <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
