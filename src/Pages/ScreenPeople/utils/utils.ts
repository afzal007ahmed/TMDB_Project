export interface TmdbPersonResponse {
    page: number;
    results: TmdbPerson[];
    total_pages: number;
    total_results: number;
  }
  
  export interface TmdbPerson {
    adult: boolean;
    gender: number;
    id: number;
    known_for: TmdbKnownFor[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string | null;
  }
  
  export interface TmdbKnownFor {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    original_title?: string;
    overview: string;
    poster_path: string | null;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
  }
  