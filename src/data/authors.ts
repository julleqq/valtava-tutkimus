export interface Author {
  slug: 'julle' | 'tatu';
  name: string;
  bio: string;
}

export const authors: Author[] = [
  {
    slug: 'julle',
    name: 'Julle',
    bio: 'Kirjoittaa tajunnasta, yhteiskunnasta ja niiden välisistä jännitteistä.',
  },
  {
    slug: 'tatu',
    name: 'Tatu',
    bio: 'Tutkii psykedeelien, filosofian ja kulttuurikritiikin leikkauspisteitä.',
  },
];

export function getAuthor(slug: 'julle' | 'tatu'): Author {
  return authors.find((a) => a.slug === slug)!;
}
