import styled from 'styled-components';
import { focusRing, focusRingDanger } from '../../../styles/mixins';

export const Input = styled.input<{ $hasError?: boolean }>`
  padding: 0.625rem ${({ theme }) => theme.spacing.lg};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: border-color 0.2s, box-shadow 0.2s;
  width: 100%;

  &:focus {
    ${({ $hasError }) => ($hasError ? focusRingDanger : focusRing)}
  }
`;

export const InputPrefix = styled.div<{ $hasError?: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    ${({ $hasError }) => ($hasError ? focusRingDanger : focusRing)}
  }

  span {
    padding: 0.625rem 0 0.625rem ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  ${Input} {
    border: none;
    border-radius: 0;
    box-shadow: none;
  }
`;
