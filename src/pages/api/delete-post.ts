import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const slug = data.get('slug')?.toString().trim();

  if (!slug) return redirect('/admin?error=missing', 302);

  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) return redirect('/admin?error=notoken', 302);

  const apiUrl = `https://api.github.com/repos/julleqq/valtava-tutkimus/contents/src/content/posts/${slug}.md`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  // Need the file's SHA to delete it
  const res = await fetch(apiUrl, { headers });
  if (!res.ok) return redirect('/admin?error=github', 302);
  const file = await res.json() as { sha: string };

  const deleteRes = await fetch(apiUrl, {
    method: 'DELETE',
    headers,
    body: JSON.stringify({
      message: `poista: ${slug}`,
      sha: file.sha,
    }),
  });

  if (!deleteRes.ok) return redirect('/admin?error=github', 302);

  return redirect('/admin?deleted=1', 302);
};
