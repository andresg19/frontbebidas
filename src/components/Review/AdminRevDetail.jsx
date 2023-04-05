import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearState, getReview, getUsersLoged } from "../../redux/actions";
import ReactStars from "react-rating-stars-component";
import { ReviewCar } from "./ReviewCar";
import "./adminRevDetail.css";
import AdminPanel from "../AdminPanel";
import Loading from "../Loading";

export const AdminRevDetail = () => {
  const user = useSelector((state) => state.currentUser);
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoading = useSelector((state) => state.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const rev = useSelector((state) => state.review);
  const usersLoged = useSelector((state) => state.usersLoged);

  let filtroId = [];
  rev.forEach((e) => {
    usersLoged.forEach((r) => {
      if (r.id === e.usuarioId) {
        filtroId.push(r);
      }
    });
  });
  console.log(rev);
  let puntaje = rev.map((e) => e.puntaje);
  let prom = puntaje.reduce((a, b) => {
    return a + b;
  }, 0);
  prom = prom / puntaje.length;
  prom = Math.round(prom);
  console.log(prom);

  useEffect(() => {
    if (!isLoading) {
      if (user && isAdmin) {
        dispatch(getUsersLoged());
        dispatch(getReview(id));
      } else {
        navigate("/*");
      }
    }
    return () => {
      dispatch(clearState());
    };
  }, [dispatch, id, isLoading]);
  return (
    <div>
      {isLoading /* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div className="admin-detail-rev-madre">
          <AdminPanel />
          <div>
            <h2>Promedio del producto:</h2>
            {prom ? (
              <ReactStars
                count={prom}
                size={35}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                edit={false}
                color="#ffd700"
              />
            ) : null}
          </div>

          <div className="admin-detail-rev-contenedor">
            {rev?.map((r) => {
              let email;
              filtroId.find((e) => {
                if (e.id === r.usuarioId) {
                  email = e.email;
                  console.log("email", email);
                }
              });
              return (
                <div key={r.id} value={r.id} className="admin-detail-rev-carta">
                  <ReviewCar
                    titulo={r.titulo}
                    comentario={r.comentario}
                    puntaje={r.puntaje}
                    producto={r.productoId}
                    fecha={r.createdAt}
                    emailUsuario={email}
                    id={r.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
