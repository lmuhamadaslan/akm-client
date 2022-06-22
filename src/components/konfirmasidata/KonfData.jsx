import React, { useEffect, useState } from "react";
import "./data.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

const KonfData = () => {
  const [tesToken, setTesToken] = useState("");
  const [tesData, setTesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTes();
  }, []);

  const getTes = async () => {
    const res = await axios.get("http://localhost:5000/akmtes");
    setTesData(res.data);
  };

  // bandingkan token dengan data di database
  const konfirmasi = async (e) => {
    e.preventDefault();
    try {
      const token = tesData.find((token) => token.tes_token === tesToken);
      if (token) {
        if (token.tes_token === tesToken) {
          navigate("/ujian");
        } else {
          alert("Konfirmasi Gagal");
        }
      } else {
        alert("Konfirmasi Gagal");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card-token">
              <div className="card-token-body">
                <div className="form-group-token">
                  <div className="row ms-5">
                    <div className="col-md-2">
                      <h4>Token</h4>
                    </div>
                    <div className="col-md-1">
                      <h5>:</h5>
                    </div>
                    <div className="col-md-3">
                      <h4>
                        {tesData.map((data) => (
                          <span>
                            <h5>{data.tes_token}</h5>
                          </span>
                        ))}
                      </h4>
                    </div>
                    <div className="col-md-2">
                      <button type="button" className="btn btn-sm btn-primary">
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card-data">
              <div className="card-data-title">
                <h3>Informasi Data Tes</h3>
              </div>
              {tesData.map((item, idx) => (
                <>
                  <div className="card-data-body" key={idx}>
                    <div className="form-group">
                      <div className="row ms-5">
                        <div className="col-md-3">
                          <h4>Nama Tes</h4>
                        </div>
                        <div className="col-md-1">
                          <h5>:</h5>
                        </div>
                        <div className="col-md-3">
                          <span>
                            <h5>{item.tes_nama}</h5>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row ms-5">
                        <div className="col-md-3">
                          <h4>Waktu Tes</h4>
                        </div>
                        <div className="col-md-1">
                          <h5>:</h5>
                        </div>
                        <div className="col-md-3">
                          <span>
                            <h5>
                              {new Date(item.tes_waktu).toDateString + " Menit"}
                            </h5>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row ms-5">
                        <div className="col-md-3">
                          <h4>Selesai</h4>
                        </div>
                        <div className="col-md-1">
                          <h5>:</h5>
                        </div>
                        <div className="col-md-6">
                          <span>
                            <h5>{item.tes_waktu_selesai}</h5>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row ms-5">
                        <div className="col-md-3">
                          <h4>Group</h4>
                        </div>
                        <div className="col-md-1">
                          <h5>:</h5>
                        </div>
                        <div className="col-md-3">
                          <span>
                            <h5>{item.tes_group_id.group_nama}</h5>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <div className="card-data-body">
                <form onSubmit={(e) => konfirmasi(e)}>
                  <div className="form-group">
                    <div className="row ms-5">
                      <div className="col-md-3">
                        <h4>Token</h4>
                      </div>
                      <div className="col-md-1">
                        <h5>:</h5>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          value={tesToken}
                          onChange={(e) => setTesToken(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mb-3">
                    <button type="submit" className="btn btn-primary">
                      Konfirmasi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KonfData;
