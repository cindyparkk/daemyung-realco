import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import colors from "../constants/colors";

const PageTab = ({ pageValue, data, isRouter, onClick, isFullWidth }) => {
  const [tabValue, setTabValue] = useState(pageValue);
  const router = useRouter();

  function samePageLinkNavigation(event) {
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return false;
    }
    return true;
  }

  const handleTabChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== "click" ||
      (event.type === "click" && samePageLinkNavigation(event))
    ) {
      setTabValue(newValue);
    }
  };

  const handleTabPagination = (path) => {
    router.push(path);
  };

  return (
    <>
      <TabsContainer>
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isRouter || isFullWidth ? "fullWidth" : "scrollable"}
          scrollButtons="auto"
          TabIndicatorProps={{
            style: { backgroundColor: colors.red, height: 2 },
          }}
        >
          {data.map((item, idx) => (
            <StyledTab
              key={idx}
              label={item.label}
              onClick={() => {
                if (isRouter) handleTabPagination(item.path);
                else onClick(idx);
              }}
            />
          ))}
        </StyledTabs>
      </TabsContainer>
    </>
  );
};

export default PageTab;

const TabsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTabs = styled(Tabs)`
  width: 100%;
`;

const StyledTab = styled(Tab)`
  && {
    border-bottom: 2px solid ${colors.darkGrey};
    &.Mui-selected {
      color: ${colors.red};
    }
  }
`;
