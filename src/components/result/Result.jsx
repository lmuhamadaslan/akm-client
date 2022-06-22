import React, { useEffect } from "react";
import Header from "../header/Header";
import { Offline, Online } from "react-detect-offline";
import Dexie from "dexie";
import axios from "axios";

function Result() {
  const db = new Dexie("AkmResultDB");

  db.version(1).stores({
    akm_jawaban_pilgan: "++id, result_soal_pilihan, result_pilihan",
    akm_jawaban_essay: "++id, result_soal_essay, result_jawaban_essay",
  });

  useEffect(() => {
    if (navigator.onLine) {
      try {
        db.akm_jawaban_pilgan.toArray().then((data) => {
          // eslint-disable-next-line array-callback-return
          data.map((item) => {
            axios
              .post("http://localhost:5000/akmpilgan", {
                result_soal_pilihan: item.result_soal_pilihan,
                result_pilihan: item.result_pilihan,
              })
              .then((res) => {
                console.log(res);
              })
              .then(() => db.akm_jawaban_pilgan.clear())
              .catch((err) => {
                console.log(err);
              });
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (navigator.onLine) {
      try {
        db.akm_jawaban_essay.toArray().then((data) => {
          // eslint-disable-next-line array-callback-return
          data.map((item) => {
            axios
              .post("http://localhost:5000/akmessay", {
                result_soal_essay: item.result_soal_essay,
                result_essay: item.result_essay,
              })
              .then((res) => {
                console.log(res);
              })
              .then(() => db.akm_jawaban_essay.clear())
              .catch((err) => {
                console.log(err);
              });
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card-ujian">
              {/* membuat ucapan terimakasih */}
              <h3>Terimakasih Telah Mengerjakan Ujian ini</h3>
              <small style={{ color: "red" }}>Jangan Tutup Halaman Ini</small>
              <div className="d-flex inline-flex justify-content-center mt-3">
                <Offline>
                  <div className="alert alert-danger " role="alert">
                    <strong>Offline!</strong>
                  </div>
                </Offline>
                <Online>
                  <div className="alert alert-success" role="alert">
                    <strong>Online!</strong>
                  </div>
                </Online>
              </div>
              <div className="d-flex inline-flex justify-content-center mt-3">
                <Online>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => [window.location.reload()]}
                  >
                    Sinkronkan Data
                  </button>
                </Online>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
