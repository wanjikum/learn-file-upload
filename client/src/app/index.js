import React from "react";
import styled from "styled-components";

import FileContainer from "./components/file-container";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  padding: 2.5rem;
`;

const Header = styled.h1`
  margin-bottom: 2rem;
`;

const App = () => {
  return (
    <Container>
      <Header>Welcome to File uploader</Header>
      <FileContainer />
    </Container>
  );
};

export default App;
