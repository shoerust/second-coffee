import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import path from 'path';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  //const allTechPostsData = getSortedPostsData(path.join(process.cwd(), 'tech'));
  const allTechPostsData = [];
  const allFictionPostsData = getSortedPostsData(path.join(process.cwd(), 'fiction'));
  const allPoetryPostData = getSortedPostsData(path.join(process.cwd(), 'poetry'));
  return {
    props: {
      allTechPostsData,
      allFictionPostsData,
      allPoetryPostData,
    },
  };
}

export default function Home({ allTechPostsData, allFictionPostsData, allPoetryPostData }) {
  return (
    <Layout home>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Fiction</h2>
        <ul className={utilStyles.list}>
          {allFictionPostsData.map(({id, date, title}) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/fiction/${id}`}>{title}</Link>
                <br/>
                <small className={utilStyles.lightText}>
                  <Date dateString={date}/>
                </small>
              </li>
          ))}
        </ul>
        <h2 className={utilStyles.headingLg}>Poetry</h2>
        <ul className={utilStyles.list}>
          {allPoetryPostData.map(({id, date, title}) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/poetry/${id}`}>{title}</Link>
                <br/>
                <small className={utilStyles.lightText}>
                  <Date dateString={date}/>
                </small>
              </li>
          ))}
        </ul>
        {/*<h2 className={utilStyles.headingLg}><Link href={`/about`}>About</Link></h2>*/}
        {/* {allTechPostsData.length > 0 ? <h2 className={utilStyles.headingLg}>Tech</h2> : <div/>}
        <ul className={utilStyles.list}>
          {allTechPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/tech/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul> */}
      </section>
    </Layout>
  );
}