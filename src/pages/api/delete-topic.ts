import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const slug = data.get('slug')?.toString().trim();

  if (!slug || slug === 'muut-aiheet') return redirect('/admin?error=missing', 302);

  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) return redirect('/admin?error=notoken', 302);

  const apiUrl =
    'https://api.github.com/repos/julleqq/valtava-tutkimus/contents/src/data/topics.json';
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  const res = await fetch(apiUrl, { headers });
  if (!res.ok) return redirect('/admin?error=github', 302);
  const file = await res.json() as { content: string; sha: string };

  const current = JSON.parse(
    Buffer.from(file.content, 'base64').toString('utf-8')
  ) as { slug: string; label: string; description: string }[];

  const updated = current.filter((t) => t.slug !== slug);
  if (updated.length === current.length) return redirect('/admin?error=github', 302);

  const writeRes = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      message: `poista aihe: ${slug}`,
      content: Buffer.from(JSON.stringify(updated, null, 2), 'utf-8').toString('base64'),
      sha: file.sha,
    }),
  });

  if (!writeRes.ok) return redirect('/admin?error=github', 302);

  return redirect('/admin?topic-deleted=1', 302);
};
