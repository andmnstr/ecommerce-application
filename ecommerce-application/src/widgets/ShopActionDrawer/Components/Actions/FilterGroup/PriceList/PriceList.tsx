import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import type { IPrice } from '../../../../Lib/types';
import classes from './PriceList.module.scss';

interface IFilterProps {
  onChange: (selectedCategories: IPrice[]) => void;
}

export const PriceList: React.FC<IFilterProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [priceFrom, setPriceFrom] = useState<number>();
  const [priceTo, setPriceTo] = useState<number>();

  const handleFromInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const price = +event.target.value;
    if (typeof price === 'number') {
      setPriceFrom(price);
    }
  };
  const handleToInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const price = +event.target.value;
    if (typeof price === 'number') {
      setPriceTo(price);
    }
  };

  const handleClick = (): void => {
    setOpen(!open);
  };

  useEffect(() => {
    if (priceFrom && priceTo) {
      onChange([{ from: priceFrom * 100, to: priceTo * 100 }]);
    } else if (typeof priceFrom === 'number') {
      onChange([{ from: priceFrom * 100, to: Number.MAX_SAFE_INTEGER }]);
    } else if (typeof priceTo === 'number') {
      onChange([{ from: 0, to: priceTo * 100 }]);
    }
  }, [priceFrom, priceTo, onChange]);

  return (
    <List component="nav">
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Price" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <ListItem
          key={1}
          sx={{ pl: 4 }}
          className={classes.priceLine}
        >
          <Typography>From:</Typography>
          <TextField
            type="number"
            sx={{ '& .MuiInputBase-root': { height: 30, width: 100 } }}
            onChange={handleFromInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          />
        </ListItem>
        <ListItem
          key={2}
          sx={{ pl: 4 }}
          className={classes.priceLine}
        >
          <Typography>To:</Typography>
          <TextField
            type="number"
            sx={{ '& .MuiInputBase-root': { height: 30, width: 100 } }}
            onChange={handleToInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
          />
        </ListItem>
      </Collapse>
    </List>
  );
};
