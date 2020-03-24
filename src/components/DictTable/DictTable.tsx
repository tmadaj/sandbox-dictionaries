import React, { useState } from 'react';
import styled from 'styled-components';
import theme from 'styles/themeProxy';
import { patchDictionary } from 'src/redux/actions';
import { Dictionary } from 'src/redux/reducers/dictionaries';
import SVG from 'react-inlinesvg';
import ErrorIcon from 'assets/icons/error.svg';
import WarnIcon from 'assets/icons/warn.svg';
import EditableTr from './EditableTr';
import Ldots from './Ldots';

interface Props {
  dictionary: Dictionary;
  preview: number;
}

const statusColorMap = {
  error: theme.palette.red10,
  warn: theme.palette.yellow10,
};

const Table = styled.table`
  width: 100%;
  border: 1px solid ${theme.swatches.primaryReadable};
  border-collapse: collapse;

  thead {
    border: 3px double ${theme.swatches.primaryReadable};
  }

  td,
  th {
    height: 2rem;
    padding: 0.4rem 0.5rem;
    border: 1px solid ${theme.swatches.primaryReadable};
  }
`;

const Icon = styled.td`
  width: 2rem;

  svg {
    vertical-align: middle;
    width: 1rem;
    height: 1rem;
    fill: ${({ severity }) => statusColorMap[severity]};
  }
`;

function renderValidationIcons(id, errors): React.ReactNode {
  if (!errors) return null;
  const { forks, duplicates, chains, cycles } = errors;

  return (
    <>
      {[...forks, ...duplicates].includes(id) && (
        <Icon severity="warn">
          <SVG src={WarnIcon} />
        </Icon>
      )}
      {[...chains, ...cycles].includes(id) && (
        <Icon severity="error">
          <SVG src={ErrorIcon} />
        </Icon>
      )}
    </>
  );
}

function renderRows(dictionary, preview, passFocus, errors): React.ReactElement[] {
  let entriesArray = Object.entries(dictionary.entries);
  if (preview) entriesArray = entriesArray.slice(0, preview);

  function handleChange(id, editedDomain, editedRange): void {
    // TODO: extract as more granular actions
    if (!editedDomain && !editedRange) {
      const { [id]: remove, ...entries } = dictionary.entries; // eslint-disable-line @typescript-eslint/no-unused-vars

      patchDictionary({ ...dictionary, entries });
    } else {
      patchDictionary({
        ...dictionary,
        entries: {
          ...dictionary.entries,
          [id]: [editedDomain, editedRange],
        },
      });
    }
  }

  return entriesArray.map(([id, [domain, range]]) => (
    <EditableTr
      key={id}
      id={id}
      initDomain={domain}
      initRange={range}
      onChange={handleChange}
      passFocus={passFocus}
    >
      {renderValidationIcons(id, errors)}
    </EditableTr>
  ));
}

export default function DictTable({
  dictionary: { entries },
  dictionary,
  preview,
  errors,
}: Props): React.ReactElement {
  const [passFocus, setPassFocus] = useState();

  function handleNewEntry(id, domain, range): void {
    const editedDictionary = {
      ...dictionary,
      entries: {
        ...entries,
        [id]: [domain, range],
      },
    };

    patchDictionary(editedDictionary);
    setPassFocus({ id, part: domain ? 'domain' : 'range' });
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th scope="col">Domain</th>
            <th scope="col">Range</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(dictionary, preview, passFocus, errors)}
          {!preview && <EditableTr key="newEntryRow" newEntry onChange={handleNewEntry} />}
        </tbody>
      </Table>
      {preview < Object.keys(entries).length && <Ldots />}
    </>
  );
}
