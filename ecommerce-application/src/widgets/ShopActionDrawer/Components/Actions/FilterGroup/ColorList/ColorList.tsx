import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { getApiRoot } from '../../../../../../shared';
import FormCheckbox from '../../../../../../shared/UI/FormCheckbox/FormCheckbox';
import { fetchFilterVariants } from '../../../../Api/fetchFilterVariants';

interface IFilterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorList: React.FC<IFilterProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<string[]>([]);

  const handleClick = (): void => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchFilterVariants(getApiRoot()).then(response => {
      setColors(response.colors);
    });
  }, []);

  return (
    <List component="nav">
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Color" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        {colors.map(color => {
          return (
            <ListItem>
              <Box>
                <FormCheckbox
                  onChange={() => {
                    return onChange;
                  }}
                  label={
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: color.toLowerCase(),
                        border: '1px solid black',
                      }}
                    />
                  }
                />
              </Box>
            </ListItem>
          );
        })}
      </Collapse>
    </List>
  );
};
