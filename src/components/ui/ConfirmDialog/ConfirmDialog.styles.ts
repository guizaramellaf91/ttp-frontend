import styled from 'styled-components';
import { down } from '../../../styles/mixins';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
`;

export const Dialog = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  padding: ${({ theme }) => theme.spacing['3xl']};
  animation: dialogEnter 0.2s ease-out;

  @keyframes dialogEnter {
    from {
      opacity: 0;
      transform: scale(0.96) translateY(8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  ${down('sm')`
    padding: ${({ theme }) => theme.spacing['2xl']};
  `}
`;

export const DialogTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const DialogMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

export const DialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.lg};

  ${down('sm')`
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  `}
`;
