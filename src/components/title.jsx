import styled from "styled-components";
import colors from "../constants/colors";

const Title = ({ text, subtitle, desc, color, hr }) => {
  return (
    <TitleContainer style={{ color: color || colors.black }}>
      <SubtitleText>{subtitle || "Daemyung's"}</SubtitleText>
      <TitleText>{text || "대명리얼코"}</TitleText>
      {hr && (
        <hr
          style={{
            width: "40%",
            border: `0.5px solid ${colors.darkGrey}`,
          }}
        />
      )}
      <DescText>{desc}</DescText>
    </TitleContainer>
  );
};

export default Title;

const TitleContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 50px 0px;
`;

const TitleText = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 30px;
`;

const SubtitleText = styled.h3`
  letter-spacing: 0.5rem;
  font-size: 12px;
  margin-bottom: 15px;
  text-transform: uppercase;
  margin-right: -0.5rem;

  span {
    color: ${colors.red};
  }
`;

const DescText = styled.p`
  font-size: 14px;
  color: ${colors.darkGrey};
  /* margin-top: 30px; */
`;
