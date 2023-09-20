export interface Article {
  id?: number;
  title: string;
  body: string;
  authorEmail: string;
  authorName: string;
  publicationDateIso: string;
  publicationDateTimestamp: number;
}