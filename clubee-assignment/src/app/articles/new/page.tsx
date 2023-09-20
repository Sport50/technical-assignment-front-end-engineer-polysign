import Link from 'next/link';
import styles from './page.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Article } from '@/app/interfaces';
import { redirect } from 'next/navigation';

export default function Page() {

  async function create(formData: FormData) {
    'use server'

    // Create new article object
    const article: Article = {
      title: String(formData.getAll("title")),
      body: String(formData.getAll("body")),
      authorName: String(formData.getAll("authorName")),
      authorEmail: String(formData.getAll("authorEmail")),
      publicationDateIso: new Date().toISOString(),
      publicationDateTimestamp: new Date().getTime(),
    }

    const res = await fetch(process.env.URL + `/api/articles`, { method: 'POST', body: JSON.stringify(article) });
    if (res.status === 201) {
      const newArticle: Article = await res.json();
      redirect(`/articles/${newArticle.id}`);
    } else {
      console.log("Article creation failed");
    }
  }

  return (
    <div>
      <div className={styles.actions}>
        <Link href="/articles">Back to articles</Link>
      </div>
      <form className={styles.form} action={create}>
        <h1>New Article</h1>
        <div className={styles.formGroup}>
          <TextField fullWidth id="title" label="Title" variant="standard" name="title" />
        </div>
        <div className={styles.formGroup}>
          <TextField multiline rows={10} fullWidth id="body" label="Body" variant="standard" name="body" />
        </div>
        <div className={styles.formGroup}>
          <TextField fullWidth id="authorName" label="Author Name" variant="standard" name="authorName" />
        </div>
        <div className={styles.formGroup}>
          <TextField fullWidth type="email" id="authorEmail" label="Author Email" variant="standard" name="authorEmail" />
        </div>
        
        <div className={styles.formGroup}>
          <Button type="submit" variant="outlined" color="primary">Create</Button>
        </div>
      </form>
    </div>
  )
}
