import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

// Nextの動的ルーティング用メソッド
export async function getStaticPaths() {
  const paths = getAllPostIds();

  return {
    paths,
    // falseにすることによってpathsに含まれないpathに遷移したとき404を返す
    // 用意していないpathに遷移された時に一時的にページを用意し、エラーページ生成まで表示される
    fallback: false,
  };
}

// SSG
export async function getStaticProps({ params }) {
  // パラメータのid(ファイル名)をもとにpostの投稿内容を取得
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Layout>
        <article>
          <h1 className={utilStyles.headingX1}>{postData.title}</h1>
          <div className={utilStyles.lightText}>{postData.date}</div>
          {/* 他者がデータをブログを登録する仕様であれば、事前にサニタイズが必要? */}
          <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
        </article>
      </Layout>
    </div>
  );
}
