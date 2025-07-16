import styled from "styled-components";

import colors from "../../../../constants/colors";

const StepCard = ({ data }) => {
  return (
    <>
      <Container>
        <h1>{data.index}</h1>
        <Title>
          <h2>{data.title}</h2>
        </Title>
        <Desc>
          <div>
            {data.descArr.map((d, idx) => (
              <ul key={idx}>
                <li>{d}</li>
              </ul>
            ))}
          </div>
        </Desc>
      </Container>
    </>
  );
};

export default StepCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* flex: 1; */
  width: 10vw;
  min-width: 225px;
  gap: 10px;
  h1 {
    font-size: 3rem;
    color: ${colors.red};
  }
`;

const Title = styled.div`
  background-color: ${colors.red};
  color: ${colors.white};
  padding: 8px 25px;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  h2 {
    font-weight: bold;
    font-size: 1.3rem;
  }
`;

const Desc = styled.div`
  width: 100%;
  min-height: 100px;
  padding: 20px 30px;
  border: 1px solid ${colors.black};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ul > li {
    font-family: "KIMM", sans-serif;
    font-weight: 500;
    line-height: 30px;
  }
`;
