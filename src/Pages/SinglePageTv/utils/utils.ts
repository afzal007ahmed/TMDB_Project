export interface TVSeriesDetails {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    last_air_date: string;
    number_of_episodes: number;
    number_of_seasons: number;
    status: string; // e.g., "Ended", "Returning Series"
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: {
      id: number;
      name: string;
    }[];
    created_by: {
      id: number;
      credit_id: string;
      name: string;
      gender: number;
      profile_path: string | null;
    }[];
    languages: string[];
    origin_country: string[];
    original_language: string;
    episode_run_time: number[];
    tagline: string;
    type: string; // e.g., "Scripted"
    homepage: string;
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    spoken_languages: {
      iso_639_1: string;
      name: string;
      english_name: string;
    }[];
    last_episode_to_air: {
      air_date: string;
      episode_number: number;
      id: number;
      name: string;
      overview: string;
      production_code: string;
      season_number: number;
      still_path: string | null;
      vote_average: number;
      vote_count: number;
    } | null;
    next_episode_to_air: {
      air_date: string;
      episode_number: number;
      id: number;
      name: string;
      overview: string;
      production_code: string;
      season_number: number;
      still_path: string | null;
      vote_average: number;
      vote_count: number;
    } | null;
    networks: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
    }[];
    seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string | null;
      season_number: number;
      vote_average: number;
    }[];
  }
  

  export interface TVCredits {
    id: number;
    cast: CastMember[];
    crew: CrewMember[];
  }
  
  export interface CastMember {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    roles: Role[];
    total_episode_count: number;
    order: number;
  }
  
  export interface Role {
    credit_id: string;
    character: string;
    episode_count: number;
  }
  
  export interface CrewMember {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    jobs: Job[];
    department: string;
    total_episode_count: number;
  }
  
  export interface Job {
    credit_id: string;
    job: string;
    episode_count: number;
  }
  
  export interface ReviewsResponse {
    id: number;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
  }
  
  export interface Review {
    author: string;
    author_details: AuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }
  
  export interface AuthorDetails {
    name?: string;
    username?: string;
    avatar_path?: string | null;
    rating?: number | null;
  }
  
  export interface TvAccountStates {
    id: number;
    favorite: boolean;
    rated: boolean | { value: number }; // Can be false or an object with a rating
    watchlist: boolean;
  }
  