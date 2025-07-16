import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import menu_KO from "../constants/routes";
import colors from "../constants/colors";

const PageTab = ({ pageValue }) => {
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
          variant="fullWidth"
          TabIndicatorProps={{
            style: { backgroundColor: colors.red, height: 2 },
          }}
        >
          {menu_KO[1].submenu.map((item, idx) => (
            <StyledTab
              key={idx}
              label={item.label}
              onClick={() => handleTabPagination(item.path)}
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
