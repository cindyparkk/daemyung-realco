import { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styled from "styled-components";
import colors from "../constants/colors";

const CustomAccordion = ({ dataItems }) => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <AccordionContainer>
      {dataItems.map((item, index) => {
        const desc = item.desc.replace(/\./g, ".\n");
        return (
          <StyledAccordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            $isFirst={index === 0}
          >
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div>
                <h1>
                  <span>{item.num}</span>
                </h1>
                <h1>{item.label}</h1>
                <p>{item.label_ENG}</p>
              </div>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <p style={{ whiteSpace: "pre-line" }}>{desc}</p>
              <div>
                {item.descArr &&
                  item.descArr.map((d, idx) => (
                    <ul key={idx}>
                      <li>{d}</li>
                    </ul>
                  ))}
              </div>
            </StyledAccordionDetails>
          </StyledAccordion>
        );
      })}
    </AccordionContainer>
  );
};

export default CustomAccordion;

const AccordionContainer = styled.div`
  width: 80%;
`;

const StyledAccordion = styled(Accordion)`
  /* border: none; */
  box-shadow: none !important;
  margin-bottom: 12px;
  background: none !important;
  &.Mui-expanded {
    /* margin: 0; */
    border-top: ${(props) =>
      !props.$isFirst && `0.5px solid ${colors.darkGrey}`};
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  border: none;

  div {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  h1 {
    color: ${colors.charcoal};
    font-size: 2rem;
    span {
      color: ${colors.red};
      font-size: 2.5rem;
    }
  }

  p {
    font-weight: 300;
    font-size: 16px;
    color: ${colors.textGrey};
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  font-size: 14px;
  color: ${colors.charcoal};
  margin-left: 80px;

  div {
    padding: 20px 0px 0px 20px;
  }
`;
