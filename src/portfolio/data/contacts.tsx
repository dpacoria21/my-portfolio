import { Contact } from '../interfaces/interfaces';
import { profile } from './profile';

export const contacts: Contact[] = [
    {
        name: 'gmail',
        path: `mailto:${profile.email}`,
        color: '#db1f45',
    },
    {
        name: 'whatsapp',
        path: profile.whatsapp,
        color: '#1fdb3e',
    },
    {
        name: 'linkedin',
        path: profile.linkedin,
        color: '#87c3f2',
    },
    {
        name: 'facebook',
        path: 'https://www.facebook.com/profile.php?id=100070190720733',
        color: '#2748ce',
    },
];
