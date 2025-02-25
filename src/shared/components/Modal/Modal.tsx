import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import styles from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  actionButtonLabel: string;
  children: React.ReactNode;
  actionButtonVariant?: 'outlined' | 'text' | 'contained';
  actionButtonColor?: 'primary' | 'secondary'
}

const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  actionButtonLabel,
  children,
  actionButtonVariant = 'contained',
  actionButtonColor = 'primary',
}) => {
  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      classes={{ paper: styles.modal }}
      fullScreen={mediaQuery}
    >
      <DialogTitle>
        <Typography variant="h6" component="span">{title}</Typography>
      </DialogTitle>
      <DialogContent dividers className={styles.content}>{children}</DialogContent>
      <DialogActions className={styles.footer}>
        <Button
          color="primary"
          variant="outlined"
          onClick={onClose}
          fullWidth={mediaQuery}
        >
          Cancel
        </Button>
        <Button
          color={actionButtonColor}
          variant={actionButtonVariant}
          onClick={onSubmit}
          fullWidth={mediaQuery}
        >
          {actionButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
