import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Checkbox, Collapse, FormControlLabel, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { getApiRoot } from '../../../../../../shared';
import { fetchFilterColors } from '../../../../Api/fetchFilterVariants';

interface IFilterProps {
  onChange: (selectedColors: string[]) => void;
}

export const ColorList: React.FC<IFilterProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const color = event.target.name;
    const isChecked = event.target.checked;
    setSelectedColors(currentSelectedColors => {
      if (isChecked) {
        return [...currentSelectedColors, color];
      }
      return currentSelectedColors.filter(selectedColor => {
        return selectedColor !== color;
      });
    });
  };

  const handleClick = (): void => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchFilterColors(getApiRoot()).then(response => {
      setColors(response);
    });
  }, []);

  useEffect(() => {
    onChange(selectedColors);
  }, [selectedColors, onChange]);

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
            <ListItem key={color}>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckboxChange}
                      name={color}
                    />
                  }
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
