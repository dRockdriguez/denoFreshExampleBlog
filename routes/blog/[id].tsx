import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "../../services/posts.ts";
import { CSS } from "$gfm/mod.ts";
import Button from "../../islands/Button.tsx";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;

    const post = await loadPost(id);

    return context.render({ post });
  },
};

export default function PagePost(props: PageProps) {
  const { post } = props?.data;
  return (
    <article class="p-4">
      <h1 class="text-5xl font-bold">{post.title}</h1>
      <Button></Button>

      <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}
