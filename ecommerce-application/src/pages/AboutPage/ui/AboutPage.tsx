import { Divider, Link, Typography } from '@mui/material';
import type React from 'react';

import rsschoolImage from '../../../../public/images/logo-rsschool3.png';
import { DeveloperCard } from '../../../widgets/DeveloperCard';
import { Header } from '../../../widgets/Header';
import { AndreyCardInfo, DmitriyCardInfo, ElenaCardInfo } from '../consts/AboutPage.consts';
import styles from './AboutPage.module.scss';

export const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <section className={styles.developerInfo__section}>
        <Link
          href="https://rs.school/"
          target="blank"
        >
          <img
            src={rsschoolImage}
            alt="RS School link"
            className={styles.developerInfo__heading_image}
          />
        </Link>
        <Typography className={styles.developerInfo__heading}>The Hardcoders Team</Typography>
        <Divider style={{ width: '95%' }} />
        <Typography className={styles.developerInfo__aboutText}>
          We are a modern development team. Our main task at the moment is training at the Rolling Scopes School, during
          which we create and develop not only simple web interfaces, but also large applications like the e-commerce
          site Krist. As part of a team assignment, we developed this product. To develop it, we used the most modern
          solutions in the field of web development, such as: Vite, React JS, Redux Toolkit, TypeScript, SASS, Jest,
          Future Sliced Design architecture.
        </Typography>
        <Typography className={styles.developerInfo__aboutText}>
          The lead developer and head of our team is Andrey Monastyrev. His responsibility is to organize scrum events,
          meetups and calls. Also he posts tasks on the Kaiten platform and helps team to realize a project&lsquo;s
          functionality.
        </Typography>
        <Typography className={styles.developerInfo__aboutText}>
          The next member of the team is Dmitry Brashkin. Dmitry is not just a developer, he is a real programming
          genius. It was he who mastered working with the Commercetools platform, as well as the backend part. Writing
          queries, creating standard templates, libraries and functionality - thats all he does.
        </Typography>
        <Typography className={styles.developerInfo__aboutText}>
          Last but not least, the team member is Elena Brashkina. Under her influence, all the main functions of the
          application are carefully thought out and implemented. She forms the logic, principles of construction, as
          well as the vector of product development. And all this goes well with her excellent skills in programming and
          developing design and functionality.
        </Typography>
        <Typography className={styles.developerInfo__aboutText}>
          The combination of a skills each of developers allowed us to create our overall product as it was intended.
        </Typography>
        <Divider style={{ width: '95%' }} />
        <div className={styles.developerInfo__card_section}>
          <DeveloperCard
            name={AndreyCardInfo.name}
            role={AndreyCardInfo.role}
            description={AndreyCardInfo.description}
            photoLink={AndreyCardInfo.photoLink}
            githubLink={AndreyCardInfo.githubLink}
            discordLink={AndreyCardInfo.discordLink}
            telegramLink={AndreyCardInfo.telegramLink}
          />
          <DeveloperCard
            name={DmitriyCardInfo.name}
            role={DmitriyCardInfo.role}
            description={DmitriyCardInfo.description}
            photoLink={DmitriyCardInfo.photoLink}
            githubLink={DmitriyCardInfo.githubLink}
            discordLink={DmitriyCardInfo.discordLink}
            telegramLink={DmitriyCardInfo.telegramLink}
          />
          <DeveloperCard
            name={ElenaCardInfo.name}
            role={ElenaCardInfo.role}
            description={ElenaCardInfo.description}
            photoLink={ElenaCardInfo.photoLink}
            githubLink={ElenaCardInfo.githubLink}
            discordLink={ElenaCardInfo.discordLink}
            telegramLink={ElenaCardInfo.telegramLink}
          />
        </div>
      </section>
    </>
  );
};
