export interface MovieCredit {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    first_air_date:string;
    vote_average: number;
    vote_count: number;
    credit_id: string;
    original_name:string ;
    // Cast-specific
    character?: string;
    order?: number;
    // Crew-specific
    department?: string;
    job?: string;
  }
  
  export interface PersonMovieCreditsResponse {
    cast: MovieCredit[];
    crew: MovieCredit[];
    id: number;
  }

  export interface PersonDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: number; // 0 = Not set, 1 = Female, 2 = Male, 3 = Non-binary
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    popularity: number;
    profile_path: string | null;
  }
  