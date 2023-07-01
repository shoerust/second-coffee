import utilStyles from '../../styles/utils.module.css';
import Layout from '../../components/layout';
import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'fiction');

export async function getStaticProps({ params }) {
    const postData = await getPostData(postsDirectory, params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds(postsDirectory);
    return {
        paths,
        fallback: false,
    };
}

export default function FictionPost({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          {/* <div className={utilStyles.lightText}>
            <h4>by <a href={`/about`}>{postData.author}</a></h4>
          </div> */}
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }