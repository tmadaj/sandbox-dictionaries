import React from 'react';
import styled from 'styled-components';

const CenteringContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Throbber(): React.ReactElement {
  return (
    <CenteringContainer>
      <h1>Loading ...</h1>
    </CenteringContainer>
  );
}
