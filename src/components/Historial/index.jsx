import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./HistorialStyles.css";
import NavBarSec from "../NavBarSec";
import {
  getAllReviews,
  getHist,
  getProducts,
  getReview,
} from "../../redux/actions";
import Loading from "../Loading";

const Historial = () => {
  const dispatch = useDispatch();
  const historial = useSelector((state) => state.historial);
  let revs = useSelector((state) => state.allReviews);
  const user = useSelector((state) => state.currentUser);
  const prod = useSelector((state) => state.products);
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLoading = useSelector((state) => state.isLoading);
  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id, "soy el di")
  console.log(historial, "Hay cosas en historial ");

  console.log(revs, "SOY EL REVS MIRAME MIRAME MIREAME");
  const prodFind = prod.filter((e) => e.id === revs.productoId);

  let [bool, setBool] = useState(false);
  let allRevs = revs.map((e) => `${e.productoId} ${e.usuarioId}`);
  console.log(allRevs, "SOY ALLREVS <====================");
  // let revId = allRevs.find(e => e.id)

  useEffect(() => {
    if (!isLoading) {
      if (user && !isAdmin) {
        dispatch(getAllReviews());
      } else {
        console.log("navigate del coctact container");
        navigate("/*");
      }
    }
    return () => {
      dispatch(getAllReviews());
    };
  }, []);

  useEffect(() => {
    //no tocar :),
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    dispatch(getHist(id));
  }, [dispatch]);

  return (
    <div>
      {isLoading || isAdmin || !user/* revisen esto!! */ ? (
        <Loading />
      ) : (
        <div>
          <div>
            <NavBarSec />
          </div>
          {historial.length > 0 ? (
            <div>
              <div class="cart-wrap">
                <div class="container">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="main-heading mb-10">Historial de Compra</div>
                      <div class="table-wishlist">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          border="0"
                          width="100%"
                        >
                          <thead>
                            <tr>
                              <th width="45%">Nombre del producto</th>
                              <th width="15%">Precio</th>
                              <th class="fecha" width="15%">
                                Fecha
                              </th>
                              {/* <th width="15%">AAA</th>
					        		<th width="10%">bbbbb</th> */}
                            </tr>
                          </thead>
                          {historial.map((e) => {
                            return (
                              <tbody>
                                <tr>
                                  <td width="45%">
                                    <div class="display-flex align-center">
                                      <div class="img-product">
                                        <img
                                          src={e.imagen}
                                          alt=""
                                          class="mCS_img_loaded"
                                        />
                                      </div>
                                      <div class="name-product">{e.nombre}</div>
                                    </div>
                                  </td>
                                  <td width="15%" class="price">
                                    ${e.precio}
                                  </td>
                                  <td width="15%">
                                    <span class="fecha">
                                      {e.createdAt.split("T")[0]}
                                    </span>
                                  </td>
                                  <td width="15%">
                                    {!allRevs.includes(`${e.id} ${id}`) ? (
                                      <Link to={`/review/${e.id}`}>
                                        <button class="round-black-btn small-btn">
                                          Dar review
                                        </button>
                                      </Link>
                                    ) : (
                                      <Link to={`/profile`}>
                                        <p class="reviewHecha">
                                          Review existente
                                        </p>
                                      </Link>
                                    )}
                                  </td>
                                  <td width="10%" class="text-center">
                                    <a href="#" class="trash-icon">
                                      <i class="far fa-trash-alt"></i>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-history">
              <div className="empty-title">
                <h3>No hay nada en el historial...</h3>
              </div>
              <div className="empty-history-image"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Historial;
