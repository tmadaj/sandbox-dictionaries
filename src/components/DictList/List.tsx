import React from 'react';
import styled from 'styled-components';
import theme from 'styles/themeProxy';
import Tile from './Tile';

interface Props {
  data: Dictionary[];
}

const List = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  overflow: auto;
  background: ${theme.swatches.secondaryBg};
  padding: 1rem;
`;

export default function({ data }: Props): React.ReactElement {
  return (
    <List>
      {data.map(dictionary => (
        <Tile key={dictionary.id} data={dictionary} />
      ))}
    </List>
  );
}
