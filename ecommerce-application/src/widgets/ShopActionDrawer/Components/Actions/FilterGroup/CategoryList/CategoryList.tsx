import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Checkbox, Collapse, FormControlLabel, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';

import { getApiRoot } from '../../../../../../shared';
import { fetchFilterCategories } from '../../../../Api/fetchFilterVariants';
import type { ICategory } from '../../../../Lib/types';

interface IFilterProps {
  onChange: (selectedCategories: ICategory[]) => void;
}

export const CategoryList: React.FC<IFilterProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const category = {
      name: event.target.name,
      id: event.target.id,
    };
    const isChecked = event.target.checked;
    setSelectedCategories(currentSelectedCategories => {
      if (isChecked) {
        return [...currentSelectedCategories, category];
      }
      return currentSelectedCategories.filter(selectedCategory => {
        return selectedCategory.id !== category.id;
      });
    });
  };

  const handleClick = (): void => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchFilterCategories(getApiRoot()).then(response => {
      setCategories(response);
    });
  }, []);

  useEffect(() => {
    onChange(selectedCategories);
  }, [selectedCategories, onChange]);

  return (
    <List component="nav">
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Category" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        {categories.map(category => {
          return (
            <ListItem key={category.id}>
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={handleCheckboxChange}
                      name={category.name}
                      id={category.id}
                    />
                  }
                  label={category.name}
                />
              </Box>
            </ListItem>
          );
        })}
      </Collapse>
    </List>
  );
};
