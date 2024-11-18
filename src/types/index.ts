export type Articles = {
   id: number;
   title: string;
   url: string;
   image_url: string;
   news_site: string;
   summary: string;
   published_at: string;
   updated_at: string;
   featured: boolean;
   launches: Launchs[];
   events: Provides[];
};
export type Launchs = {
   launch_id: string;
   provider: string;
};
export type Provides = {
   event_id: number;
   provider: string;
};
export type ObjectArcticle = {
   count: number;
   next: string;
   previous: null;
   results: Articles[];
};
export type dataResultsType = {
   day: boolean;
   week: boolean;
   month: boolean;
   year: boolean;
};
export type User = {
   userName: string;
   isUser: boolean;
};