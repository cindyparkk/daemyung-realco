import styled from "styled-components";
import useTransitionRouter from "../hooks/useTransitionRouter";

import colors from "../constants/colors";
import CustomButton from "./button";

const NewsCarousel = ({ news }) => {
  const recentItems = news.slice(-3);
  const emptySlots = 3 - recentItems.length;

  const { push } = useTransitionRouter();

  const handleNewsClick = async (id) => {
    await push(`/get-in-touch/news/${id}`);
  };
  return (
    <NewsSectionContainer>
      {news.map((item, index) => (
        <NewsItem key={index}>
          <div>
            <NewsImage src={item.imageUrl} alt={item.imageAlt} />
            <NewsContent>
              <NewsTitleText>{item.title}</NewsTitleText>
              <NewsDate>{item.publishedAt}</NewsDate>
            </NewsContent>
          </div>
          <div style={{ textAlign: "center" }}>
            <CustomButton
              text={"read more"}
              onClick={() => handleNewsClick(item._id)}
            />
          </div>
        </NewsItem>
      ))}
      {/* Fills remaining columns to keep grid width consistent */}
      {Array.from({ length: emptySlots }).map((_, idx) => (
        <div key={`empty-${idx}`} style={{ visibility: "hidden" }} />
      ))}
    </NewsSectionContainer>
  );
};

export default NewsCarousel;

const NewsSectionContainer = styled.section`
  width: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const NewsItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #dedede;
  min-height: 420px;
  padding-bottom: 20px;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 180px;
  height: auto;
  object-fit: cover;
`;

const NewsContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const NewsTitleText = styled.h1`
  font-size: 20px;
  color: ${colors.black};
  margin-bottom: 10px;
`;

const NewsDate = styled.p`
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 10px;
`;
