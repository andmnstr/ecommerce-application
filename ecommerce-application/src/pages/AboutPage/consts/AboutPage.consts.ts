import AndreyPhoto from '../../../../public/images/developer1.jpg';
import DmitriyPhoto from '../../../../public/images/developer2.jpg';
import ElenaPhoto from '../../../../public/images/developer3.jpg';
import type { IDeveloperCardProps } from '../../../widgets/DeveloperCard/Lib/types';

export const AndreyCardInfo: IDeveloperCardProps = {
  name: 'Andrey Monastyrev',
  role: 'Team Leader',
  description:
    'Andrey is a current senior specialist in programming of SCADA and industrial automation systems. He likes books by foreign science fiction writers, electronic music, and programming. He also loves cats.',
  photoLink: AndreyPhoto,
  githubLink: 'https://github.com/andmnstr',
  discordLink: 'https://discord.com/users/876466197091209257',
  telegramLink: 'https://t.me/andmnstr',
};

export const DmitriyCardInfo: IDeveloperCardProps = {
  name: 'Dmitriy Brashkin',
  role: 'Senior Developer',
  description:
    'Dmitriy is 30 years old specialist in a low-current systems and video surveillance at Avtovaz Corporation. He has been living in Togliatti all this time and married to Elena Brashkina, dveloper from our team.',
  photoLink: DmitriyPhoto,
  githubLink: 'https://github.com/Baltika-Cat',
  discordLink: 'https://discord.com/users/761247533032144906',
  telegramLink: 'https://t.me/BaltikaCat',
};

export const ElenaCardInfo: IDeveloperCardProps = {
  name: 'Elena Brashkina',
  role: 'Senior Developer',
  description:
    'Elena is an English teacher who lives in Togliatti and works online. She adores good books, rock music and her husband Dmitriy.',
  photoLink: ElenaPhoto,
  githubLink: 'https://github.com/Adamanta1',
  discordLink: 'https://discord.com/users/761242812519546971',
  telegramLink: 'https://t.me/adamanta1',
};
