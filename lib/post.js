import path from "path";
import fs from "fs";
import matter from "gray-matter"; // TODO　ライブラリ確認
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ""); //ファイル名

    // マークダウンファイルを文字列として取得
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    // idとデータを返却
    return {
      id,
      ...matterResult.data,
    };
  });
  return allPostsData;
}

// getstaticpathを使いreturnで使うpathを返却
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""), //ファイル名 [id].jsに合わせる必要があり
      },
    };
  });
  /*
    [
      {
        params: {
          id : "<filename>"
        },
      {
        params: {
          id : "<filename>"
        },
      }
    ]
  */
}

// IDに基づいてブログデータを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContent);
  // matterResult.content; // ただの文字列
  // remarkライブラリで文字列をhtml化し、返却用に文字列に直す
  const blogContent = await remark().use(html).process(matterResult.content);
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML, //本文
    ...matterResult.data, //metaデータ
  };
}
