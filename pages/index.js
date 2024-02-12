import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

// SSGの場合はgetStaticPropsを使用する。
export async function getStaticProps() {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// SSRの場合は？
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Layout home>
        <section>
          <p className={utilStyle.headingMd}>
            初心者エンジニアのtakeです/日々プログラムを学習/好きな言語は日本語です。
          </p>
        </section>

        <section>
          <h2 className={utilStyle.boldText}>📝初心者エンジニアのブログ</h2>
          <div className={styles.grid}>
            {allPostsData.map(({ id, title, date, thumbnail }) => (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  <img src={thumbnail} className={styles.thumbnailImage} />
                </Link>
                <Link href="/" className={utilStyle.boldText}>
                  {title}
                </Link>
                <br></br>
                <small className={utilStyle.lightText}>{date}</small>
              </article>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
}
