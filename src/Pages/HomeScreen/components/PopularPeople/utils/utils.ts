export interface PopularPerson {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    known_for: KnownFor[];
  }

  export interface KnownFor {
    backdrop_path: string | null;
    id: number;
    title?: string; // for movies
    original_title?: string;
    name?: string; // for TV
    original_name?: string;
    overview: string;
    poster_path: string | null;
    media_type: "movie" | "tv";
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date?: string; // for movies
    first_air_date?: string; // for TV
    vote_average: number;
    vote_count: number;
    origin_country?: string[]; // only for TV shows
    video?: boolean; // only for movies
  }
  