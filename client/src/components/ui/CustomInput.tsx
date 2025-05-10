import React from 'react';
import { TextField, TextFieldProps, SxProps, Theme } from '@mui/material';
import { Field, FieldProps } from 'formik';

interface CustomInputProps  extends Omit<TextFieldProps, 'name'> {
  name: string;
  formik?: boolean;
  sx?: SxProps<Theme>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  formik = true,
  ...props
}) => {
  if (formik) {
    return (
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <TextField
            {...field}
            {...props}
            fullWidth
            variant="outlined"
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
              ...props.sx,
            }}
          />
        )}
      </Field>
    );
  }

  return (
    <TextField
      {...props}
      name={name}
      fullWidth
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
        ...props.sx,
      }}
    />
  );
};

export default CustomInput;