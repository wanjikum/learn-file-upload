import React from "react";
import styled from "styled-components";
import { Progress } from "reactstrap";

const Container = styled.div`
  margin-bottom: 2rem;
`;

const ProgressBar = ({ progress = 0 }) =>
  progress ? (
    <Container>
      <div className="text-center">{progress}%</div>
      <Progress value={progress} />
    </Container>
  ) : null;

export default ProgressBar;
