import styled from 'styled-components';
import { down } from '../../styles/mixins';
import { Card } from '../ui';

export const TableWrapper = styled.div`
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.md};

  th,
  td {
    padding: 0.875rem ${({ theme }) => theme.spacing.xl};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  th {
    background: ${({ theme }) => theme.colors.surfaceHover};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    text-transform: uppercase;
    letter-spacing: 0.025em;
    white-space: nowrap;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  ${down('md')`
    thead {
      display: none;
    }

    tbody tr {
      display: block;
      padding: ${({ theme }) => theme.spacing.xl};
      border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${({ theme }) => theme.spacing.md} 0;
      border-bottom: none;
      gap: ${({ theme }) => theme.spacing.xl};

      &::before {
        content: attr(data-label);
        font-weight: ${({ theme }) => theme.fontWeights.semibold};
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: ${({ theme }) => theme.fontSizes.xs};
        text-transform: uppercase;
        flex-shrink: 0;
      }
    }
  `}
`;

export const TableActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;

  ${down('md')`
    justify-content: flex-end;
    width: 100%;
  `}
`;

export const EmptyState = styled(Card)`
  padding: ${({ theme }) => theme.spacing['5xl']};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
