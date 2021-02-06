import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { PaginationBtns } from "../constant/TableText";
// is-loading
const PaginationBtn = ({ previous, next, changePage }) => {
  const [isPrevLoading, setIsPrevLoading] = useState(false);
  const [isNextLoading, setIsNextLoading] = useState(false);

  useEffect(() => {
    setIsPrevLoading(false);
    setIsNextLoading(false);
    // return () => {};
  }, [previous, next]);

  return (
    <tr>
      <td>
        <div className="columns is-mobile">
          <div className="column">
            Current page:{" "}
            {!previous
              ? 1
              : !next
              ? Number(previous.split("=").pop()) + 1
              : Number(next.split("=").pop()) - 1}
          </div>
          <div className="column">{PaginationBtns.Pagination}</div>
          <div className="column">
            <button
              type="button"
              className={`button is-primary mx-1 ${
                isPrevLoading ? "is-loading" : ""
              }`}
              value={previous}
              disabled={!previous}
              onClick={(event) => {
                setIsPrevLoading(true);
                changePage(event);
              }}
            >
              {PaginationBtns.Back}
            </button>
          </div>
          <div className="column">
            <button
              type="button"
              className={`button is-info ${isNextLoading ? "is-loading" : ""}`}
              value={next}
              disabled={!next}
              onClick={(event) => {
                setIsNextLoading(true);
                changePage(event);
              }}
            >
              {PaginationBtns.Next}
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

PaginationBtn.propTypes = {
  previous: PropTypes.string,
  next: PropTypes.string,
  changePage: PropTypes.func.isRequired,
};

export default PaginationBtn;
