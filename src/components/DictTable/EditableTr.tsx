import React, { useState } from 'react';
import ueid from 'utils/ueid';
import StyledInput from './StyledInput';

interface Props {
  id: string;
  initDomain: string;
  initRange: string;
  onChange: Function<void>;
  newEntry: boolean;
  passFocus: { id: string; part: string };
}

export default function EditableTr({
  id,
  initDomain = '',
  initRange = '',
  newEntry = false,
  onChange = () => {
    console.warn('EditableTr: props.onChange missing');
  },
  passFocus = { id: '', part: '' },
  children,
}: Props): React.ReactElement {
  const [domain, setDomain] = useState(initDomain);
  const [range, setRange] = useState(initRange);

  function handleDomainChange({ target: { value } }): void {
    if (newEntry) {
      onChange(ueid(), value, range);
    } else {
      setDomain(value);
      onChange(id, value, range);
    }
  }

  function handleRangeChange({ target: { value } }): void {
    if (newEntry) {
      onChange(ueid(), domain, value);
    } else {
      setRange(value);
      onChange(id, domain, value);
    }
  }

  return (
    // TODO: in preview don't render inputs
    <tr>
      <td>
        <StyledInput
          type="text"
          placeholder="New domain value"
          value={domain}
          onChange={handleDomainChange}
          autoFocus={passFocus.id === id && passFocus.part === 'domain'}
        />
      </td>
      <td>
        <StyledInput
          type="text"
          placeholder="New range value"
          value={range}
          onChange={handleRangeChange}
          autoFocus={passFocus.id === id && passFocus.part === 'range'}
        />
      </td>
      {children}
    </tr>
  );
}
