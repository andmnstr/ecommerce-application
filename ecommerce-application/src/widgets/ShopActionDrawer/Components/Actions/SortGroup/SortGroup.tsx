import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, FormControlLabel, List, ListItemButton, ListItemText, Radio, RadioGroup } from '@mui/material';
import { common } from '@mui/material/colors';
import type React from 'react';
import { useState } from 'react';

import type { ISortProps } from '../../../Lib/types';

export const SortGroup: React.FC<ISortProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const handleClick = (): void => {
    setOpen(!open);
  };
  return (
    <List component="nav">
      <ListItemButton onClick={handleClick}>
        <ListItemText
          primary="Sort by"
          sx={{
            '& .MuiListItemText-primary': {
              fontWeight: 700,
              fontSize: 18,
            },
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <RadioGroup
          name="sort"
          onChange={onChange}
        >
          <FormControlLabel
            value="name"
            control={
              <Radio
                sx={{
                  color: common.black,
                  '&.Mui-checked': {
                    color: common.black,
                  },
                }}
              />
            }
            label="Name"
          />
          <FormControlLabel
            value="ascending"
            control={
              <Radio
                sx={{
                  color: common.black,
                  '&.Mui-checked': {
                    color: common.black,
                  },
                }}
              />
            }
            label="Ascending price"
          />
          <FormControlLabel
            value="descending"
            control={
              <Radio
                sx={{
                  color: common.black,
                  '&.Mui-checked': {
                    color: common.black,
                  },
                }}
              />
            }
            label="Descending price"
          />
        </RadioGroup>
      </Collapse>
    </List>
  );
};
