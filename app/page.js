import Link from 'next/link';
import Image from 'next/image';
import SyugendoIcon from '../public/syugendo-icon.png';
import { getDatabase } from '../lib/notion';
import Text from '../components/text';
import styles from './index.module.css';

export const databaseId = process.env?.NOTION_DATABASE_ID ?? 'NOTION_DATABASE_ID';

async function getPosts() {
  const database = await getDatabase();

  return database;
}

export default async function Page() {
  const posts = await getPosts();
  return (
    <div>
      <main className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logos}>
            <Image src={SyugendoIcon} width="80" height="80" />
          </div>
          <h1>修験道全国MAP</h1>
          <p>
            全国の修験道を一覧するためのお役立ちサイトです。
          </p>
        </header>
        <div>
          <iframe
            title="修験道全国MAP-google-my-map"
            src="https://www.google.com/maps/d/u/0/edit?mid=1_8ttLkBm9o-EmJPNZvHeu5pSYvAHHME&usp=sharing"
            width="300"
            height="300"
          />
        </div>
        <h2 className={styles.heading}>All Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              'en-US',
              {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              },
            );
            const slug = post.properties?.Slug?.rich_text[0].text.content;

            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/article/${slug}`}>
                    <Text title={post.properties?.Name?.title} />
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/article/${slug}`}>Read post →</Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
