import { Search } from '@mui/icons-material';
import { Box, IconButton, InputBase } from '@mui/material';
import type React from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { IFormProps, ISearchField } from '../../Lib/types';
import classes from './ProductSearch.module.scss';

export const ProductSearch: React.FC<IFormProps> = ({ onSubmit }) => {
  const { handleSubmit, control } = useForm<ISearchField>();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={classes.formContainer}
    >
      <Controller
        name="search"
        control={control}
        render={({ field }) => {
          return (
            <InputBase
              onChange={field.onChange}
              type="text"
              placeholder="Search"
              fullWidth
              autoComplete="false"
              size="small"
              sx={{
                '& .MuiInputBase-input': {
                  padding: 0,
                },
              }}
            />
          );
        }}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </Box>
  );
};
