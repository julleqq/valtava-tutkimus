export interface Topic {
  slug: string;
  label: string;
  description: string;
}

export const topics: Topic[] = [
  {
    slug: 'psykedeelit',
    label: 'Psykedeelit',
    description: 'Muuttuneet tajunnantilat, terapeuttinen potentiaali ja kulttuurinen merkitys.',
  },
  {
    slug: 'tietoisuus',
    label: 'Tietoisuus',
    description: 'Subjektiivisen kokemuksen filosofia, mieli ja sen rajat.',
  },
  {
    slug: 'yhteiskuntakritiikki',
    label: 'Yhteiskuntakritiikki',
    description: 'Rakenteiden, vallan ja normien analyyttinen tarkastelu.',
  },
  {
    slug: 'filosofia',
    label: 'Filosofia',
    description: 'Olemassaolon, tiedon ja etiikan peruskysymykset.',
  },
];

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
