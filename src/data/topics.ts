import topicsData from './topics.json';

export interface Topic {
  slug: string;
  label: string;
  description: string;
}

export const topics: Topic[] = topicsData;

export function getTopic(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
