export interface MediaItem {
    backdrop_path: string | null;
    id: number;
    name?: string;
    original_name?: string;
    title?: string;
    original_title?: string;
    overview: string;
    poster_path: string | null;
    media_type: "movie" | "tv";
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    first_air_date?: string;
    release_date?: string;
    vote_average: number;
    vote_count: number;
    origin_country?: string[];
    video?: boolean;
  }
  
export interface MediaResponse {
    page: number;
    results: MediaItem[];
  }
  

  export const dateMapping : Record<string,string> = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
  };
  