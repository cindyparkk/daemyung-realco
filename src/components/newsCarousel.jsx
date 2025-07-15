import styled from "styled-components";

import colors from "../constants/colors";
import CustomButton from "./button";

const NewsCarousel = ({ news }) => {
  return (
    <NewsSectionContainer>
      {news.map((item, index) => (
        <NewsItem key={index}>
          <div>
            <NewsImage src={item.image} alt={item.title} />
            <NewsContent>
              <NewsTitleText>{item.title}</NewsTitleText>
              <NewsDate>{item.date}</NewsDate>
            </NewsContent>
          </div>
          <div style={{ textAlign: "center" }}>
            <CustomButton text={"read more"} />
          </div>
        </NewsItem>
      ))}
    </NewsSectionContainer>
  );
};

export default NewsCarousel;

const NewsSectionContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NewsItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${colors.textGrey};
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
