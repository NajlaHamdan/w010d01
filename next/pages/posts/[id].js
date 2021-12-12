export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
export async function getStaticProps({params}) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      post,
    },
  }
}

function Post({ post }) {
  return (
    <ul>
      {
        <>
        <li>{post.title}</li>
        <li>{post.body}</li>
        </>
      }
    </ul>
  )
}
export default Post;