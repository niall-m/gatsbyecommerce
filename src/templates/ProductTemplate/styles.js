import styled from 'styled-components';

export const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;

    >div:first-child{
      order: 2;
    }

    >div:last-child{
      order: 1;
    }
  }
`;