import styled from 'styled-components';

export const Form = styled.form`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

export const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;
