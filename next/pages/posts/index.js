import Link from "next/link";

// posts will be populated at build time by getStaticProps()
function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`posts/${post.id}`}><li>{post.title}</li></Link>
        </div>
      ))}
    </ul>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

export default Posts;
