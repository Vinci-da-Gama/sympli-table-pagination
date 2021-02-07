import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { PaginationBtns, StorageKeys } from "../constant";
import { getCurrentPageNum } from "../helpers";

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
            Current page: {getCurrentPageNum(previous, next)}
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
                localStorage.setItem(
                  StorageKeys.currentPageNum,
                  previous.split("=").pop()
                );
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
                localStorage.setItem(
                  StorageKeys.currentPageNum,
                  next.split("=").pop()
                );
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
