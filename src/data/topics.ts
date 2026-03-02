import topicsData from './topics.json';

export interface Topic {
  slug: string;
  label: string;
  description: string;
}

// User-defined topics (from topics.json)
export const topics: Topic[] = topicsData;

// Fallback topic for posts whose topic has been deleted
export const FALLBACK_TOPIC: Topic = {
  slug: 'muut-aiheet',
  label: 'Muut aiheet',
  description: 'Kirjoituksia joiden alkuperäinen aihe on poistettu.',
};

// All topics including fallback — used for routing and lookups
export const allTopics: Topic[] = [...topics, FALLBACK_TOPIC];

export function getTopic(slug: string): Topic {
  return topics.find((t) => t.slug === slug) ?? FALLBACK_TOPIC;
}
