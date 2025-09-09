export interface Announcement {
  id: number;
  title: string;
  content: string;
  publicationDate: string;
  lastUpdate: string;
  categories?: Category[];
}

export interface Category {
  id: number;
  name: string;
}
