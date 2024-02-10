import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import utilStyle from "../styles/utils.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Layout>
        <section>
          <p className={utilStyle.headingMd}>
            初心者エンジニアのtakeです/日々プログラムを学習/好きな言語はJSです
          </p>
        </section>

        <section>
          <h2 className={utilStyle.boldText}>📝初心者エンジニアのブログ</h2>
          <div className={styles.grid}>
            <article>
              <Link href="">
                <img
                  src="/images/thumbnail01.jpg"
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href="/" className={utilStyle.boldText}>
                SSGとSSRの使い分けはいつ？
              </Link>
              <br></br>
              <small className={utilStyle.lightText}>登録日2024-02-10</small>
            </article>
            <article>
              <Link href="">
                <img
                  src="/images/thumbnail01.jpg"
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href="/" className={utilStyle.boldText}>
                SSGとSSRの使い分けはいつ？
              </Link>
              <br></br>
              <small className={utilStyle.lightText}>登録日2024-02-10</small>
            </article>
            <article>
              <Link href="">
                <img
                  src="/images/thumbnail01.jpg"
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href="/" className={utilStyle.boldText}>
                SSGとSSRの使い分けはいつ？
              </Link>
              <br></br>
              <small className={utilStyle.lightText}>登録日2024-02-10</small>
            </article>
            <article>
              <Link href="">
                <img
                  src="/images/thumbnail01.jpg"
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href="/" className={utilStyle.boldText}>
                SSGとSSRの使い分けはいつ？
              </Link>
              <br></br>
              <small className={utilStyle.lightText}>登録日2024-02-10</small>
            </article>
          </div>
        </section>
      </Layout>
    </div>
  );
}
