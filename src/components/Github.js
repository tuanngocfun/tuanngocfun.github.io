import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  const colourTheme = {
    level0: '#E8E8E8 ',
    level1: '#FFC300',
    level2: '#FF5733',
    level3: '#C70039',
    level4: '#900C3F '
  };
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      <GitHubCalendar
        username="tuanngocfun"
        blockSize={15}
        blockMargin={5}
        blockRadius={7}
        theme={colourTheme}
        fontSize={16}
      />
    </Row>
  );
}

export default Github;