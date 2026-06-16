import styled from 'styled-components';
import { Card } from '../ui';

export const Form = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;
