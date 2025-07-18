import React from "react";
import styled, { css } from "styled-components";
import colors from "../../../../constants/colors";

const TimelineSection = React.forwardRef(
  ({ year, items, active, onClick, isFirst, isLast }, ref) => (
    <Section ref={ref} id={`year-${year}`}>
      <Marker onClick={onClick}>
        {/* Top half-line */}
        {/* <TopLine $isFirst={isFirst} /> */}
        <Circle $active={active} />
        {/* <BottomLine $isLast={isLast} /> */}
        <h1>{year}</h1>
      </Marker>
      <Content>
        {items.map((item, idx) => (
          <div key={idx}>
            <span>{item.month}</span>
            <p>{item.text}</p>
          </div>
        ))}
      </Content>
    </Section>
  )
);

export default TimelineSection;

const Section = styled.section`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 20vh;
`;

const Marker = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
  cursor: pointer;
  h1 {
    /* margin: 0; */
    font-size: 3rem;
    color: ${colors.red};
    /* margin-bottom: 25px; */
    margin-left: 35px;
  }
`;

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid ${colors.black};
  background: ${colors.red};
  position: relative;
  transition: box-shadow 0.2s;
  z-index: 5;
  ${({ $active }) =>
    $active &&
    css`
      width: 28px;
      height: 28px;
      box-shadow: 0 0 0 2px ${colors.red};
      /* border: 2px solid ${colors.red}; */
    `}
`;

const Content = styled.div`
  margin-left: 70px;
  padding-top: 35px;
  div {
    display: flex;
    align-items: flex-start;
    padding-bottom: 15px;
  }
  p {
    margin-bottom: 8px;
    color: #fff;
    letter-spacing: 0.01em;
    font-size: 18px;
    font-weight: 300;
    /* max-width: 10vw; */
  }
  span {
    font-weight: 600;
    letter-spacing: 10px;
    font-size: 18px;
    margin-right: 10px;
    min-width: 36px;
  }
`;

const Connector = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 100%;
  background: #e84e36;
  z-index: 0;
  border-radius: 3px;
  opacity: 0.9;
`;

// Only show top/bottom connector pieces as needed
const TopLine = styled.div`
  width: 2px;
  height: 100vh;
  background: ${colors.white};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  z-index: 0;
  border-radius: 3px;
  opacity: 0.9;
  /* display: ${({ $isFirst }) => ($isFirst ? "none" : "block")}; */
  z-index: 1;
`;
const BottomLine = styled.div`
  width: 2px;
  height: 50%;
  background: ${colors.white};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  z-index: 0;
  border-radius: 3px;
  opacity: 0.9;
  display: ${({ $isLast }) => ($isLast ? "none" : "block")};
`;
