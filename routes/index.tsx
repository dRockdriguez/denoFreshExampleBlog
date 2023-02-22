import { Handlers, PageProps } from "$fresh/server.ts";
import { listPosts } from "../services/posts.ts";
import { Post } from "../types.d.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const posts = await listPosts();

    return context.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { posts } = props?.data;

  return (
    <main class="p-4">
      <h1 class="text-2xl">Mi blog</h1>

      {posts.map((post: Post) => (
        <article class="p-4">
          <h2 class="text-2xl font-bold">
            <a class="underline hover:text-blue-500" href={`/blog/${post.id}`}>
              {post.title}
            </a>
          </h2>
          <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
        </article>
      ))}
    </main>
  );
}
