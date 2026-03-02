import authorsData from './authors.json';

export interface Author {
  slug: string;
  name: string;
  bio: string;
}

export const authors: Author[] = authorsData;

export function getAuthor(slug: string): Author {
  return authors.find((a) => a.slug === slug) ?? { slug, name: slug, bio: '' };
}
