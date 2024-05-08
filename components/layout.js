import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import ArticleCoffee from './articleCoffee';
import HomeCoffee from './homeCoffee';

const name = 'Second Coffee';
export const siteTitle = 'Second Coffee';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Thoughts on technology and programming along with some creative writing."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
            <>
                {/* <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            /> */}
                <HomeCoffee/>
                <h1 className={utilStyles.heading2Xl}>{name}</h1>
                <h2 className={utilStyles.headingSm}>
                    by <Link href="/about">Will Southers</Link>
                </h2>
            </>
        ) : (
            <>
                <Link href="/">
                    <ArticleCoffee/>
                </Link>
                <h2 className={utilStyles.headingMd}>
                    <Link href="/" className={utilStyles.colorInherit}>
                        {name}
                    </Link>
                </h2>
            </>
        )}
      </header>
        <main className={home ? styles.homeMain : styles.secondaryMain}>{children}</main>
        {!home && (
            <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}