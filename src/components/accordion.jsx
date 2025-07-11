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
        return (
          <StyledAccordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
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
              <p>{item.desc}</p>
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
  box-shadow: none;
  margin-bottom: 12px;
  &.Mui-expanded {
    /* margin: 0; */
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
`;
