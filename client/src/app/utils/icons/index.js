import React from "react";
import styled from "styled-components";

import { BLACK } from "../colours";

const DefaultIcon = styled.svg`
  height: 24px;
  width: 24px;
  color: ${BLACK};
`;

export default (Icon) => {
  function iconWrapper(props) {
    return (
      <DefaultIcon
        {...props}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Icon />
      </DefaultIcon>
    );
  }

  return iconWrapper;
};
