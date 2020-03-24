import styled from 'styled-components';

export default styled.div`
  margin: 0.5rem auto;
  writing-mode: vertical-rl;
  font-weight: 900;

  ::after {
    content: '...';
    vertical-align: super;
  }
`;
