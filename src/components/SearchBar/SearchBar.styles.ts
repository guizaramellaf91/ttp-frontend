import styled from 'styled-components';

export const SearchContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SearchFields = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;
