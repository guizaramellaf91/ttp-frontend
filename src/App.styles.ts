import styled from 'styled-components';
import { down } from './styles/mixins';

export const AppContainer = styled.div`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};

  ${down('sm')`
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  `}
`;
