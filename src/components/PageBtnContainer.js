import { Icon, Pagination, PaginationItem } from "@material-tailwind/react";
import { useAppContext } from "context/appContext";
import React from "react";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    changePage(newPage);
  };

  return (
    <Pagination>
      <PaginationItem ripple="dark">
        <button onClick={prevPage}>
          <Icon name="keyboard_arrow_left" />
        </button>
      </PaginationItem>
      {pages.map((pageNumber) => {
        return (
          <PaginationItem
            color={pageNumber === page ? "lightBlue" : "blueGray"}
            ripple="light"
            key={pageNumber}
          >
            <button type="button" onClick={() => changePage(pageNumber)}>
              {pageNumber}
            </button>
          </PaginationItem>
        );
      })}

      <PaginationItem ripple="dark">
        <button onClick={nextPage}>
          <Icon name="keyboard_arrow_right" />
        </button>
      </PaginationItem>
    </Pagination>
  );
};

export default PageBtnContainer;
