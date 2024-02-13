import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";
import { useState } from "react";

// SSGの場合はgetStaticPropsを使用する。
export async function getStaticProps() {
  // pages/posts配下のmdファイルのid(ファイル名)とmetaデータを取得
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

const perPage = 4;

export default function Home({ allPostsData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPageNumber = allPostsData.length / perPage;
  const indexOfLastPost = currentPage * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;
  const allPostsDataFilter = allPostsData.filter(
    (_, index) => index >= indexOfFirstPost && index < indexOfLastPost
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Layout home>
        <section>
          <p className={utilStyle.headingMd}>
            初心者エンジニアのTAKEです/日々プログラムを学習/好きな言語は日本語です。
          </p>
        </section>

        <section>
          <h2 className={utilStyle.boldText}>📝初心者エンジニアのブログ</h2>
          <div className={styles.grid}>
            {allPostsDataFilter.map(({ id, title, date, thumbnail }) => (
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

          <div>
            {currentPage > 1 && (
              <>
                <button onClick={prevPage}>Previus</button>
                <br />
                <small>{`現在のページ(${currentPage} / ${lastPageNumber})`}</small>
              </>
            )}
            {currentPage !== lastPageNumber && (
              <>
                <button onClick={nextPage}>Next</button>
                <br />
                <small>{`現在のページ(${currentPage} / ${lastPageNumber})`}</small>
              </>
            )}
          </div>
        </section>
      </Layout>
    </div>
  );
}
