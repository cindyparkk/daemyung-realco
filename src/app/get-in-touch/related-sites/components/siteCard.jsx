import styled from "styled-components";
import Link from "next/link";

import colors from "../../../../constants/colors";

const SiteCard = ({ data, category }) => {
  return (
    <>
      <SiteGroupBox>
        <TitleWrapper>
          <hr
            style={{
              width: "20%",
              border: `0.5px solid ${colors.darkGrey}`,
            }}
          />
          <h3>{category}</h3>
          <hr
            style={{
              width: "20%",
              border: `0.5px solid ${colors.darkGrey}`,
            }}
          />
        </TitleWrapper>
        {data?.map((item, idx) => (
          <SiteBox key={idx}>
            <Link href={item.link} target="_blank" rel="noopener noreferrer">
              <LogoWrapper>
                <Logo src={item.logoUrl} alt={item.logoAlt} />
              </LogoWrapper>
            </Link>
          </SiteBox>
        ))}
      </SiteGroupBox>
    </>
  );
};

export default SiteCard;

const SiteGroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75px;
  min-width: 225px;
  gap: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  h3 {
    letter-spacing: 0.5rem;
    font-size: 12px;
    color: ${colors.darkGrey};
    text-align: center;
    /* width: 100%; */
    margin-right: -0.5rem;
  }
`;

const SiteBox = styled.div`
  background-color: ${colors.white};
  border-radius: 5px;
  width: 100%;
  padding: 20px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform ease-in-out 0.15s;
  }
`;

const LogoWrapper = styled.div`
  height: 25px;
  width: auto;
  overflow: hidden; // hides any overflow for non-matching aspect ratios
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 100%;
  width: auto;
  display: block;
`;
