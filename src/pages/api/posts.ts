import type { APIRoute } from 'astro';

export const prerender = false;

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/å/g, 'a')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.formData();
  const title = data.get('title')?.toString().trim() ?? '';
  const description = data.get('description')?.toString().trim() ?? '';
  const author = data.get('author')?.toString() ?? '';
  const topic = data.get('topic')?.toString() ?? '';
  const date = data.get('date')?.toString() ?? '';
  const content = data.get('content')?.toString().trim() ?? '';

  if (!title || !content) {
    return redirect('/admin?error=missing', 302);
  }

  const token = import.meta.env.GITHUB_TOKEN;
  if (!token) {
    return redirect('/admin?error=notoken', 302);
  }

  const slug = toSlug(title);
  const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
author: ${author}
topic: ${topic}
date: ${date}
draft: false
---

${content}
`;

  const encodedContent = Buffer.from(fileContent, 'utf-8').toString('base64');
  const apiUrl = `https://api.github.com/repos/julleqq/valtava-tutkimus/contents/src/content/posts/${slug}.md`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };

  // Check if file already exists (need SHA to update)
  const existing = await fetch(apiUrl, { headers });
  const body: Record<string, string> = {
    message: `lisää: ${title}`,
    content: encodedContent,
  };
  if (existing.ok) {
    const json = await existing.json() as { sha: string };
    body.sha = json.sha;
    body.message = `päivitä: ${title}`;
  }

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return redirect('/admin?error=github', 302);
  }

  return redirect('/admin?success=1', 302);
};
