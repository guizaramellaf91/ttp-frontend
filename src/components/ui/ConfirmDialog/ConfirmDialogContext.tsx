import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Button } from '../Button';
import {
  Dialog,
  DialogActions,
  DialogMessage,
  DialogTitle,
  Overlay,
} from './ConfirmDialog.styles';

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface DialogState extends ConfirmOptions {
  resolve: (confirmed: boolean) => void;
}

interface ConfirmDialogContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | null>(null);

const DEFAULT_OPTIONS = {
  title: 'Confirmar ação',
  confirmLabel: 'Confirmar',
  cancelLabel: 'Cancelar',
} as const;

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState | null>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setDialog((current) => {
        current?.resolve(false);
        return { ...options, resolve };
      });
    });
  }, []);

  const close = useCallback((confirmed: boolean) => {
    setDialog((current) => {
      current?.resolve(confirmed);
      return null;
    });
  }, []);

  useEffect(() => {
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dialog, close]);

  const contextValue = useMemo(() => ({ confirm }), [confirm]);

  const title = dialog?.title ?? DEFAULT_OPTIONS.title;
  const confirmLabel = dialog?.confirmLabel ?? DEFAULT_OPTIONS.confirmLabel;
  const cancelLabel = dialog?.cancelLabel ?? DEFAULT_OPTIONS.cancelLabel;

  return (
    <ConfirmDialogContext.Provider value={contextValue}>
      {children}
      {dialog && (
        <Overlay role="presentation" onClick={() => close(false)}>
          <Dialog
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
            <DialogMessage id="confirm-dialog-message">{dialog.message}</DialogMessage>
            <DialogActions>
              <Button
                ref={cancelButtonRef}
                type="button"
                $variant="secondary"
                onClick={() => close(false)}
              >
                {cancelLabel}
              </Button>
              <Button type="button" $variant="danger" onClick={() => close(true)}>
                {confirmLabel}
              </Button>
            </DialogActions>
          </Dialog>
        </Overlay>
      )}
    </ConfirmDialogContext.Provider>
  );
}

export function useConfirm(): ConfirmDialogContextValue['confirm'] {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error('useConfirm deve ser usado dentro de ConfirmDialogProvider');
  }
  return context.confirm;
}
