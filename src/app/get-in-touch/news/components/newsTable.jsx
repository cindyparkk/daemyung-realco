import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import colors from "../../../../constants/colors";

const ITEMS_PER_PAGE = 3;

const NewsTable = ({ data }) => {
  const [page, setPage] = useState(1);
  const total = data.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const currentItems = data.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const router = useRouter();

  const handleNewsClick = (id) => {
    router.push(`/get-in-touch/news/${id}`);
  };

  return (
    <NewsWrapper>
      {currentItems.map((item) => (
        <NewsItem key={item._id} onClick={() => handleNewsClick(item._id)}>
          {item.imageUrl ? (
            <NewsImage src={item.imageUrl} alt={item.imageAlt} />
          ) : (
            <NewsImageTextWrapper>
              <h1>뉴스</h1>
            </NewsImageTextWrapper>
          )}
          <NewsContent>
            <div>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsMeta>{item.source}</NewsMeta>
            </div>
            <NewsMeta>{item.publishedAt}</NewsMeta>
          </NewsContent>
        </NewsItem>
      ))}

      <TablePaginationWrapper>
        <ArrowButton
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </ArrowButton>

        {[...Array(totalPages).keys()].map((idx) => (
          <PageDot
            key={idx + 1}
            $active={page === idx + 1}
            onClick={() => handlePageChange(idx + 1)}
            // as="button"
          >
            {idx + 1}
          </PageDot>
        ))}

        <ArrowButton
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          &gt;
        </ArrowButton>
      </TablePaginationWrapper>
    </NewsWrapper>
  );
};

export default NewsTable;

const NewsWrapper = styled.div`
  width: 90%;
  margin: auto;
  background: #fff;
`;

const NewsItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-right: 25px;

  &:first-child {
    border-top: 1px solid #eee;
  }

  &:hover {
    cursor: pointer;
    background-color: #f8f7f6;
  }
`;

const NewsImage = styled.img`
  width: 220px;
  height: 140px;
  object-fit: cover;
  margin-right: 25px;
  border-right: 1px solid #eee;
`;

const NewsImageTextWrapper = styled.div`
  width: 220px;
  height: 140px;
  border-right: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 25px;

  h1 {
    color: ${colors.red};
  }
`;

const NewsContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NewsTitle = styled.h2`
  font-size: 20px;
  margin: 0 0 10px 0;
`;

const NewsMeta = styled.div`
  color: #888;
  font-size: 14px;
`;

const TablePaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0 8px 0;

  button {
    border: none;
    font-size: 18px;
    cursor: pointer;
    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const ArrowButton = styled.button`
  margin: 0 8px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: ${colors.black};
`;

const PageDot = styled.button`
  width: 30px;
  height: 30px;
  font-weight: bold;
  color: ${({ $active }) => ($active ? colors.white : colors.black)};
  background-color: ${({ $active }) =>
    $active ? colors.black : "transparent"};

  ${(props) =>
    props.$active &&
    `
    border-radius: 50%;
  `}
`;
