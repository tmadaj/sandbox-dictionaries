import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { addDictionary, setDictionaries } from 'src/redux/actions';
import { getDictionaries } from 'src/redux/selectors';
import { Dictionary } from 'src/redux/reducers/dictionaries';
import Header from 'components/Header';
import Button from 'components/Button';
import DictList from 'components/DictList';

const emptyDictionary = { name: 'New Dictionary', entries: [] };

function handleNewClick(): void {
  addDictionary(emptyDictionary);
}

async function handlePopulateClick(): Promise<void> {
  const { default: dummyData } = await import('assets/dummyData');

  setDictionaries(dummyData);
}

export default function Overview(): React.ReactNode {
  const dictionaries: Dictionary[] = useSelector(getDictionaries, shallowEqual);

  return (
    <>
      <Header title="Overview">
        <Button onClick={handleNewClick}>New dictionary</Button>
        <Button onClick={handlePopulateClick}>Populate database</Button>
      </Header>
      <DictList data={dictionaries} />
    </>
  );
}
