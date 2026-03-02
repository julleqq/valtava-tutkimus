import type { APIRoute } from 'astro';

export const prerender = false;

function toSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const label = data.get('label')?.toString().trim() ?? '';
  const description = data.get('description')?.toString().trim() ?? '';

  if (!label) return redirect('/admin?error=missing-topic', 302);

  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) return redirect('/admin?error=notoken', 302);

  const slug = toSlug(label);
  const apiUrl =
    'https://api.github.com/repos/julleqq/valtava-tutkimus/contents/src/data/topics.json';
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  // Fetch current topics.json
  const res = await fetch(apiUrl, { headers });
  if (!res.ok) return redirect('/admin?error=github', 302);
  const file = await res.json() as { content: string; sha: string };

  const current = JSON.parse(Buffer.from(file.content, 'base64').toString('utf-8')) as {
    slug: string; label: string; description: string;
  }[];

  // Avoid duplicates
  if (current.some((t) => t.slug === slug)) {
    return redirect('/admin?error=topic-exists', 302);
  }

  current.push({ slug, label, description });

  const updated = Buffer.from(JSON.stringify(current, null, 2), 'utf-8').toString('base64');

  const writeRes = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `lisää aihe: ${label}`,
      content: updated,
      sha: file.sha,
    }),
  });

  if (!writeRes.ok) return redirect('/admin?error=github', 302);

  return redirect('/admin?topic-success=1', 302);
};
