import { css } from 'styled-components';

export const focusRing = css`
  outline: none;
  border-color: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryLight};
`;

export const focusRingDanger = css`
  outline: none;
  border-color: ${({ theme }) => theme.colors.danger};
  box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.dangerLight};
`;

export const buttonActive = css`
  &:active {
    transform: scale(0.98);
  }
`;

export const down = (breakpoint: 'sm' | 'md' | 'lg') => (...args: Parameters<typeof css>) => css`
  @media (max-width: ${({ theme }) => theme.breakpoints[breakpoint]}) {
    ${css(...args)}
  }
`;
