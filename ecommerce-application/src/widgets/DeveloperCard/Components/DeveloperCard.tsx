import { Card, Link, ListItem, Typography } from '@mui/material';
import type React from 'react';

import type { IDeveloperCardProps } from '../Lib/types';
import styles from './DeveloperCard.module.scss';

export const DeveloperCard: React.FC<IDeveloperCardProps> = props => {
  const { name, role, description, photoLink, githubLink, discordLink, telegramLink } = props;

  return (
    <div className={styles.developerInfo__card}>
      <Card className={styles.developerInfo__main_info}>
        <Typography className={styles.developerInfo__name}>{name}</Typography>
        <img
          className={styles.developerInfo__photo}
          src={photoLink}
          alt="developer"
        />
        <Typography className={styles.developerInfo__role}>{role}</Typography>
        <Typography className={styles.developerInfo__text}>{description}</Typography>
      </Card>
      <Card className={styles.developerInfo__contacts}>
        <ListItem>
          <Link
            className={styles.developerInfo__github_link}
            href={githubLink}
            target="blank"
          />
          <Link
            className={styles.developerInfo__discord_link}
            href={discordLink}
            target="blank"
          />
          <Link
            className={styles.developerInfo__telegram_link}
            href={telegramLink}
            target="blank"
          />
        </ListItem>
      </Card>
    </div>
  );
};
