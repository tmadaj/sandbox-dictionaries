import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/themeProxy';
import DictTable from 'components/DictTable';
import validateConsistency from 'utils/dictionaryConsistency';
import { deleteDictionary } from 'src/redux/actions';
import { Dictionary } from 'src/redux/reducers/dictionaries';
import SVG from 'react-inlinesvg';
import DeleteIcon from 'assets/icons/delete.svg';
import ErrorIcon from 'assets/icons/error.svg';
import WarnIcon from 'assets/icons/warn.svg';

interface Props {
  data: Dictionary;
}

const Tile = styled.div`
  position: relative;
  width: 20rem;
  height: 20rem;
  margin: 1rem;
  padding: 1rem;
  background: ${theme.swatches.primaryBg};
  border: 2px solid ${theme.palette.gray30};
  cursor: pointer;

  &:hover {
    box-shadow: ${theme.palette.shadow};
    transition: box-shadow 200ms;

    > button {
      visibility: visible;
    }
  }
`;

const Name = styled.h3`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Icon = styled(SVG)`
  position: absolute;
  top: 1rem;
  left: 1em;
  width: 1rem;
  height: 1rem;
  fill: ${({ severity }) => theme.swatches[severity]};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  visibility: hidden;
  border: none;
  background: transparent;

  svg {
    width: 1.25rem;
    height: 1.25rem;

    &:hover {
      fill: ${theme.palette.red10};
      transition: box-shadow 200ms;
    }
  }
`;

export default function({ data: { id, name, entries }, data }: Props): React.ReactElement {
  const history = useHistory();
  const handleTileClick = useCallback(() => history.push(`edit/${id}`), [id, history]);
  const handleDeleteClick = useCallback(
    event => {
      event.stopPropagation();
      deleteDictionary(id);
    },
    [id],
  );
  const { consistent, severity } = validateConsistency(entries);

  return (
    <Tile onClick={handleTileClick} severity={severity}>
      {!consistent && <Icon src={severity === 'warn' ? WarnIcon : ErrorIcon} severity={severity} />}
      <Name>{name}</Name>
      <DeleteButton onClick={handleDeleteClick}>
        <SVG src={DeleteIcon} />
      </DeleteButton>
      <DictTable preview={6} dictionary={data} />
    </Tile>
  );
}
