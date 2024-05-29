import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import type { IFilterProps } from '../../../Lib/types';
import { CategoryList } from './CategoryList/CategoryList';
import { ColorList } from './ColorList/ColorList';

export const FilterGroup: React.FC<IFilterProps> = ({ onColorChange, onCategoryChange, onPriceChange }) => {
  const [open, setOpen] = useState(false);
  const handleClick = (): void => {
    setOpen(!open);
    console.log(onPriceChange);
  };
  return (
    <List component="nav">
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Filter by" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <ColorList onChange={onColorChange} />
        <CategoryList onChange={onCategoryChange} />
      </Collapse>
    </List>
  );
};
