import React from "react";
import styled from "styled-components";
import { Alert } from "reactstrap";

const Wrapper = styled.div`
  margin-top: 1rem;
`;

const DiplayErrors = ({ errorMessages = [] }) => (
  <Wrapper>
    {errorMessages.map((message, key) => (
      <Alert color="danger" key={key}>
        {message}
      </Alert>
    ))}
  </Wrapper>
);

export default DiplayErrors;
