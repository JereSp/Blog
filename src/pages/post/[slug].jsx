import { GraphQLClient, gql } from 'graphql-request';
import styles from "../../styles/article.module.css"

const hygraph = new GraphQLClient(
    'https://api-sa-east-1.hygraph.com/v2/clgid9s1c27x401ug1lf64rak/master'
);

export async function getStaticProps({ params }) {
  console.log("params", params.slug, typeof params.slug)
  const { post } = await hygraph.request(
    `
    query PostPage($slug: String!) {
      post(where: { slug: $slug }) {
        title
        image{
          url
        }
        content{
          html
        }
        date
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      post,
    },
  };
}
  
  export async function getStaticPaths() {
    const { posts } = await hygraph.request(`
    query post {
        posts {
          slug
        }
      }
    `);
  console.log("soy posts", posts)
    return {
      paths: posts.map(( {slug} ) => ({
        params: {slug} ,
      })),
      fallback: false,
    };
  }



export default ({ post }) => (
  <>
    <h1>{post.title}</h1>
    <img className={styles.image}src={post.image.url}/>
    <div dangerouslySetInnerHTML={{__html: post.content.html}}></div>
  </>
);

