import { extract } from "$std/encoding/front_matter/any.ts";
import type { Post } from "../types.d.ts";
import { render } from "$gfm/mod.ts";

export async function loadPost(id: string): Promise<Post | null> {
  let raw: string;

  try {
    raw = await Deno.readTextFile(`./content/posts/${id}.md`);
  } catch {
    return null;
  }

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;

  const post: Post = {
    id,
    title: params.title,
    date: new Date(params.date),
    body: render(body),
    exceprt: params.excerpt,
  };

  return post;
}

export async function listPosts(): Promise<Post[]> {
  const promises: any[] = [];
  const entries = Deno.readDir("./content/posts");

  for await (const entry of entries) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      promises.push(loadPost(entry.name.replace(/\.md$/, "")));
    }
  }

  const posts = await Promise.all(promises);
  const postFiltered = posts.filter((post) => post !== null);

  return postFiltered.sort((a, b) => b.date.getTime() - a.date.getTime());
}
