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
