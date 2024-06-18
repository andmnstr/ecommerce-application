import { Skeleton } from '@mui/material';
import type React from 'react';

import styles from './AttributeSelector.module.scss';

interface IAttributeSelectorProps {
  type: string | undefined;
  values: string[] | undefined;
}

export const AttributeSelector: React.FC<IAttributeSelectorProps> = ({ type, values }) => {
  const blockVisible = values !== undefined && values.length > 0;
  const attributes: Set<string> = new Set(values);
  const labelName = type?.toUpperCase();

  return (
    <div
      className={styles.attribute_selector}
      hidden={blockVisible}
    >
      {type ? (
        <div className={styles.attribute_selector_label}>{labelName}</div>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          className={styles.attribute_pseudo_label}
        />
      )}
      {type ? (
        <div className={styles.attribute_options}>
          {[...attributes].map(value => {
            const key = (Math.random() * 10000).toFixed(0);
            if (type === 'colors' && value) {
              return (
                <div
                  className={styles.attribute_option}
                  style={{ backgroundColor: value }}
                  key={key}
                />
              );
            }
            if (type !== 'colors' && value) {
              return (
                <div
                  className={styles.attribute_option}
                  key={key}
                >
                  {value}
                </div>
              );
            }
            return <div />;
          })}
        </div>
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          className={styles.attribute_pseudo_options}
        />
      )}
    </div>
  );
};
