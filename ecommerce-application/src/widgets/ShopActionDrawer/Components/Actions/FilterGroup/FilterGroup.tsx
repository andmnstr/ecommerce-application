import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import type React from 'react';
import { useState } from 'react';

import type { IFilterProps } from '../../../Lib/types';
import { CategoryList } from './CategoryList/CategoryList';
import { ColorList } from './ColorList/ColorList';
import { PriceList } from './PriceList/PriceList';

export const FilterGroup: React.FC<IFilterProps> = ({ onColorChange, onCategoryChange, onPriceChange }) => {
  const [open, setOpen] = useState(false);
  const handleClick = (): void => {
    setOpen(!open);
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
        <ListItem sx={{ pl: 2 }}>
          <ColorList onChange={onColorChange} />
        </ListItem>
        <ListItem sx={{ pl: 2 }}>
          <CategoryList onChange={onCategoryChange} />
        </ListItem>
        <ListItem sx={{ pl: 2 }}>
          <PriceList onChange={onPriceChange} />
        </ListItem>
      </Collapse>
    </List>
  );
};
