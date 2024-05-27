import type React from 'react';

import { ColorList } from './ColorList/ColorList';

interface IFilterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FilterGroup: React.FC<IFilterProps> = ({ onChange }) => {
  return <ColorList onChange={onChange} />;
};
