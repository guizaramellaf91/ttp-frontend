import styled, { css } from 'styled-components';
import { buttonActive } from '../../../styles/mixins';

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.textPrimary};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover {
      background: ${({ theme }) => theme.colors.border};
    }
  `,
  edit: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
  delete: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    background: ${({ theme }) => theme.colors.dangerLight};
    color: ${({ theme }) => theme.colors.danger};
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.dangerHover};
    }
  `,
} as const;

export type ButtonVariant = keyof typeof variantStyles;

export const Button = styled.button<{ $variant?: ButtonVariant }>`
  padding: ${({ theme, $variant }) =>
    $variant === 'edit' || $variant === 'delete'
      ? undefined
      : `0.625rem ${theme.spacing['2xl']}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  ${({ $variant = 'primary' }) => variantStyles[$variant]}
  ${buttonActive}
`;
