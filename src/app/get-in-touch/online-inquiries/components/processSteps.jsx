import styled from "styled-components";
import colors from "../../../../constants/colors";

const steps = [
  "문의",
  "담당자 배정",
  "검토 작업",
  "전화 상담",
  "오프라인 미팅",
  "견적서 송부",
];

const ProcessSteps = ({ isMobile }) => {
  const hideConnector = (idx) => {
    if (isMobile) {
      return idx < steps.length - 1 && idx !== 2;
    } else return idx < steps.length - 1;
  };

  return (
    <StepsWrapper $isMobile={isMobile}>
      {steps.map((label, idx) => (
        <StepItem key={label} $isMobile={isMobile}>
          <StepCircle $isMobile={isMobile}>
            <h1>{idx + 1}</h1>
          </StepCircle>
          <StepLabel $isMobile={isMobile}>{label}</StepLabel>
          {hideConnector(idx) && <StepConnector />}
        </StepItem>
      ))}
    </StepsWrapper>
  );
};

export default ProcessSteps;

const StepsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin: 48px 0;

  ${(props) =>
    props.$isMobile &&
    `
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, auto);
      gap: 32px 0;
      justify-items: center;
      align-items: start;
    `}
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 130px;
`;

const StepCircle = styled.div`
  width: 48px;
  height: 48px;
  border: 3px solid ${colors.red};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 1;

  h1 {
    font-size: 26px;
    color: ${colors.red};
  }
`;

const StepLabel = styled.h1`
  margin-top: 10px;
  color: ${colors.red};
  font-size: 19px;
  font-weight: 600;
  text-align: center;
`;

const StepConnector = styled.div`
  min-width: 150px;
  height: 3px;
  background: ${colors.red};
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateY(-50%);
  z-index: 0;
  @media (max-width: 700px) {
    width: 40px;
  }
`;
