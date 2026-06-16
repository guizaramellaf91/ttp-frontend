import styled from 'styled-components';
import { down } from '../styles/mixins';

export const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  ${down('sm')`
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  `}
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const EmployeesSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.md};
`;
