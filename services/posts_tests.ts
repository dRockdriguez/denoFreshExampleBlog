import { assertEquals } from "$std/testing/asserts.ts";
import { loadPost } from "./posts.ts";

Deno.test("LoadPost() returns null if the post does not exist", async () => {
  const post = await loadPost("non-existent-post");

  assertEquals(post, null);
});

Deno.test("LoadPost() returns a post if post does exists", async () => {
  const post = await loadPost("hello-world");

  assertEquals(post?.id, "hello-world");
  assertEquals(post?.title, "Hello World");
});
