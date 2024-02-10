import path from "path";
import fs from "fs";
import matter from "gray-matter"; // TODO　ライブラリ確認

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
