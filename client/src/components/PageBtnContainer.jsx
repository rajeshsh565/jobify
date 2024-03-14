import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useAllJobsContext } from "../pages/AllJobs";
import { useLocation, useNavigate } from "react-router-dom";

const PageBtnContainer = () => {
  const { data } = useAllJobsContext();
  const { currentPage, totalPages } = data;
  const prevPageNumber = totalPages!=0 && (currentPage===0? totalPages : parseInt(currentPage) - 1);
  const nextPageNumber = totalPages!=0 && (currentPage===totalPages? 0 : parseInt(currentPage) + 1);
  const btns = Array.from(
    { length: totalPages },
    (_, pageNumber) => pageNumber + 1
  );
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    return navigate(`${pathname}?${searchParams.toString()}`);
  };
  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          currentPage == 1 ? handlePageChange(totalPages) : handlePageChange(prevPageNumber);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {/* if previous page number is greater than 1 (ignoring when total pages are 3), then print the ... */}
        {totalPages > 3 && prevPageNumber > 1 && (
          <button className="btn page-btn dots">...</button>
        )}

        {/* Page Buttons */}
        {btns.map((pageNumber) => {
          const activePage = pageNumber == currentPage;
          const showPrevPageButton = pageNumber == prevPageNumber;
          const showNextPageButton = pageNumber == nextPageNumber;
          const showExtraPageButton =
            (currentPage == 1 && pageNumber == parseInt(currentPage) + 2) ||
            (currentPage == totalPages && pageNumber == currentPage - 2);

          if (
            activePage ||
            showPrevPageButton ||
            showNextPageButton ||
            showExtraPageButton
          ) {
            return (
              <button
                className={`btn page-btn ${activePage && `active`}`}
                onClick={()=>handlePageChange(pageNumber)}
                key={pageNumber}
              >
                {pageNumber}
              </button>
            );
          }
        })}

        {/* if next page number is less than total pages, then print the ... */}
        {totalPages > 3 && nextPageNumber < totalPages && (
          <button className="btn page-btn dots">...</button>
        )}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          currentPage == totalPages ? handlePageChange(1) : handlePageChange(nextPageNumber);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};
export default PageBtnContainer;
