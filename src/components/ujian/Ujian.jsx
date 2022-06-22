/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import Timer from "./Timer";
import "./ujian.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dexie from "dexie";
import { Offline, Online } from "react-detect-offline";

function Ujian() {
  const db = new Dexie("AkmResultDB");

  db.version(1).stores({
    akm_jawaban_pilgan: "++id, result_soal_pilihan, result_pilihan",
    akm_jawaban_essay: "++id, result_soal_essay, result_jawaban_essay",
  });

  const [soal, setSoal] = useState([]);
  const [jawaban, setJawaban] = useState([]);
  const [soalResult, setSoalResult] = useState("");
  const [soalEssay, setSoalEssay] = useState("");
  const [jawabanPilihan, setJawabanPilihan] = useState("");
  const [jawabanEssay, setJawabanEssay] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [soalPerPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getSoal();
    getJawaban();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (navigator.onLine) {
  //     try {
  //       db.akm_result.toArray().then((data) => {
  //         // eslint-disable-next-line array-callback-return
  //         data.map((item) => {
  //           axios
  //             .post("http://localhost:5000/akmresult", {
  //               result_pilihan_ganda: item.result_pilihan_ganda,
  //               result_essay: item.result_essay,
  //             })
  //             .then((res) => {
  //               console.log(res);
  //             })
  //             .then(() => db.akm_result.clear())
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //         });
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const getSoal = async () => {
    const res = await axios.get("http://localhost:5000/akmsoal");
    setSoal(res.data);
  };

  const getJawaban = async () => {
    const res = await axios.get("http://localhost:5000/akmjawaban");
    setJawaban(res.data);
  };

  const addAnswerPilgan = async () => {
    if (navigator.onLine) {
      try {
        const data = {
          result_soal_pilihan: soalResult,
          result_pilihan: jawabanPilihan,
        };
        await axios.post("http://localhost:5000/akmpilgan", data);
        // console.log(data);
        // navigate("/result");
      } catch (error) {
        console.log(error);
      }
    } else {
      db.akm_jawaban_pilgan.add({
        result_soal_pilihan: soalResult,
        result_pilihan: jawabanPilihan,
      });
    }
  };

  const addAnswerEssay = async (e) => {
    e.preventDefault();
    if (navigator.onLine) {
      try {
        const data = {
          result_soal_essay: soalEssay,
          result_essay: jawabanEssay,
        };
        await axios.post("http://localhost:5000/akmessay", data);
        // console.log(data);
        // navigate("/result");
      } catch (error) {
        console.log(error);
      }
    } else {
      db.akm_jawaban_essay.add({
        result_soal_essay: soalEssay,
        result_essay: jawabanEssay,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Jawaban anda telah disimpan");
    navigate("/result");
  };

  const hoursMinSecs = { hours: 0, minutes: 10, seconds: 0 };

  const indexOfLastSoal = currentPage * soalPerPage;
  const indexOfFirstSoal = indexOfLastSoal - soalPerPage;
  const currentSoal = soal.slice(indexOfFirstSoal, indexOfLastSoal);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card-navigate">
              <Timer hoursMinSecs={hoursMinSecs} />
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
          </div>
          <div className="col-md-8">
            <div className="card-ujian">
              <form onSubmit={(e) => handleSubmit(e)}>
                {currentSoal.map((item, index) => (
                  <div key={index}>
                    {/* show soal using input and send data */}
                    <h3 className="mb-5 mt-3">{item.soal_detail}</h3>
                    {item.soal_tipe === 1
                      ? jawaban.map(
                          (jawaban) =>
                            jawaban.jawaban_soal_id === item._id && (
                              <ul
                                className="form-check mb-3"
                                key={jawaban._id}
                                onClick={() => [
                                  setJawabanPilihan(jawaban.jawaban_detail),
                                  setSoalResult(item._id),
                                ]}
                              >
                                <li>{jawaban.jawaban_detail}</li>
                              </ul>
                            )
                        )
                      : item.soal_tipe === 2 && (
                          <>
                            <textarea
                              type="text"
                              className="form-control mt-3"
                              style={{ height: "100px" }}
                              placeholder="Ketik Jawaban Disini"
                              value={jawabanEssay}
                              onChange={(e) => [
                                setJawabanEssay(e.target.value),
                                setSoalEssay(item._id),
                              ]}
                            />
                            <button
                              className="btn btn-sm btn-primary mt-3"
                              onClick={(e) => addAnswerEssay(e)}
                            >
                              Kirim Jawaban
                            </button>
                          </>
                        )}
                  </div>
                ))}
                {soal.length <= indexOfLastSoal && (
                  <button type="submit" className="btn btn-primary mt-5">
                    Hentikan Tes
                  </button>
                )}
              </form>
              <nav>
                <ul className="pagination d-flex justify-content-center mt-5">
                  {soalPerPage <= indexOfFirstSoal && (
                    <a
                      className="page-link me-4"
                      href="#"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      <h3>{"<"}</h3>
                    </a>
                  )}
                  {soal.length === indexOfFirstSoal ? (
                    <a
                      className="page-link"
                      href="#"
                      style={{ color: "black" }}
                    >
                      <h3>{">"}</h3>
                    </a>
                  ) : soal.length > indexOfLastSoal ? (
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => [
                        paginate(currentPage + 1),
                        addAnswerPilgan(),
                      ]}
                    >
                      <h3>{">"}</h3>
                    </a>
                  ) : null}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ujian;
