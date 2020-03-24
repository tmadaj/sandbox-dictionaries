import React, { useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/themeProxy';
import validateConsistency from 'utils/dictionaryConsistency';
import { deleteDictionary } from 'src/redux/actions';
import { getDictionary } from 'src/redux/selectors';
import { Dictionary } from 'src/redux/reducers/dictionaries';
import Header from 'components/Header';
import Button from 'components/Button';
import DictTable from 'components/DictTable';

interface Props {
  match: { params: { id: string } };
}

const statusColorMap = {
  error: theme.palette.red10,
  warn: theme.palette.yellow10,
  consistent: theme.palette.green10,
};

const TableContainer = styled.div`
  max-width: 40rem;
  margin: 2rem auto;
`;

const Validation = styled.div`
  margin-bottom: 1rem;
  color: ${({ severity }) => statusColorMap[severity]};
`;

const ValidationDetails = styled.p``;

export default function Edit({
  match: {
    params: { id },
  },
}: Props): React.ReactElement {
  const history = useHistory();
  const dictionary: Dictionary = useSelector(() => getDictionary(id), shallowEqual);
  const { name, entries } = dictionary;
  const {
    consistent,
    severity,
    details: { forks, duplicates, chains, cycles },
    details,
  } = validateConsistency(entries, true);

  const handleDeleteClick = useCallback(() => {
    history.push(`/overview`);
    deleteDictionary(id);
  }, [id, history]);

  const issueList = `
    Issues:
    ${forks.length ? `${forks.length} forks |` : ''}
    ${duplicates.length ? `${duplicates.length} duplicates |` : ''}
    ${chains.length ? `${chains.length} chains |` : ''}
    ${cycles.length ? `${cycles.length} cycles |` : ''}
  `;

  return (
    <>
      <Header title={`Edit ${name}`}>
        <Link to="/overview">Back to Overview</Link>
        <Button onClick={handleDeleteClick}>Delete dictionary</Button>
      </Header>
      <TableContainer>
        <Validation consistent={consistent} severity={severity}>
          Dictionary is {!consistent && 'in'}consistent
          <ValidationDetails>{!consistent && issueList}</ValidationDetails>
        </Validation>
        <DictTable dictionary={dictionary} errors={details} />
      </TableContainer>
    </>
  );
}
