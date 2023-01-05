import "./styles.css";
import { Dispatch, SetStateAction, Fragment } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  setActualPage: Dispatch<SetStateAction<number>>;
  actualPage: number;
  maxPages: number;
}

const paginationMockArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Pagination: React.FC<PaginationProps> = ({
  setActualPage,
  actualPage,
  maxPages,
}) => {
  const actionBackPage = () => {
    if (actualPage === 1) {
      return;
    } else {
      setActualPage((prev) => prev - 1);
    }
  };

  const actionAdvancePage = () => {
    if (actualPage === maxPages) {
      return;
    } else {
      setActualPage((prev) => prev + 1);
    }
  };

  const actionChangeActualPage = (item: number) => {
    setActualPage(item);
  };

  return (
    <div className="pagination-container">
      <button className="button-arrow" onClick={actionBackPage}>
        <IoIosArrowBack className="arrow" fontSize={20} />
      </button>
      <div className="container-numbers-pagination">
        {paginationMockArray.map((item) => {
          if (item > maxPages) {
            return null;
          }

          return (
            <Fragment key={item}>
              <button
                className="numbers-button"
                style={{
                  backgroundColor: item === actualPage ? "#aab6be" : "#FAFAFA",
                }}
                onClick={() => actionChangeActualPage(item)}
              >
                {item}
              </button>
              {maxPages > 9 ? <p>......</p> : null}
            </Fragment>
          );
        })}
      </div>
      <button className="button-arrow" onClick={actionAdvancePage}>
        <IoIosArrowForward className="arrow" fontSize={20} />
      </button>
    </div>
  );
};
