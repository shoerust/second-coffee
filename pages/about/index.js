import Layout from "../../components/layout";
import Head from "next/head";
import Image from 'next/image';
import utilStyles from '../../styles/utils.module.css';

export default function About() {
    return <>
        <Head>
            <title>About</title>
        </Head>
        <Layout about>
            <p>
                Hello!
            </p>
            <p>
                My name is Will Southers and I fiddle around with computers for a living. Sometimes my changes to bits and bytes result in the production of an animated feature film, other times they cause bugs that don’t result in the production of an animated feature film.
            </p>
            <p>
                I created Second Coffee as a place for me to store and share my creative writing. It’s primarily for short stories, but maybe something more beguiling and sinister like a screenplay or a technology opinion piece will appear one day. You’ve been warned! Anyway, next time you take five and grab your <i>second coffee</i> consider having a scroll and giving something a read. I’d love to know what you think, but only if you have something nice to say. I’m a millennial.
            </p>
            <p>
                - Will
            </p>
            <Image
                          priority
                          src="/images/profile.jpg"
                          className={utilStyles.borderCircle}
                          height={144}
                          width={144}
                          alt=""
                        />
        </Layout>
    </>;
}