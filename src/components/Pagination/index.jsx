import React from "react";
import "./PagStyles.css";

export default class Pagination extends React.Component {
  render() {
    const { product, productsPerPage, pagination, currentPage } = this.props;
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(product / productsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <nav className="nav-pag">
        <ul className="ul">
          <li className="pagination">
            {currentPage >= 3 ? (
              <button
                className="pagination-button"
                onClick={() => pagination(currentPage - 2)}
              >
                {" "}
                {"<<"}
              </button>
            ) : null}
          </li>
          <li className="pagination">
            {currentPage !== 1 ? (
              <button
                className="pagination-button"
                onClick={() => pagination(currentPage - 1)}
              >
                {" "}
                {currentPage - 1}
              </button>
            ) : null}
          </li>
          <li className="pagination">
            <button
              className="pagination-number"
              onClick={() => pagination(currentPage)}
            >
              {currentPage}
            </button>
          </li>
          <li className="pagination">
            {currentPage > pageNumbers.length ? null : (
              <button
                className="pagination-button"
                onClick={() => pagination(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
            )}
          </li>
          <li className="pagination">
            {currentPage > pageNumbers.length - 1 ? null : (
              <button
                className="pagination-button"
                onClick={() => pagination(currentPage + 2)}
              >
                {">>"}
              </button>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}
