import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      sx={{
        textTransform: 'none',
        borderRadius: '8px',
        ...props.sx,
      }}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
