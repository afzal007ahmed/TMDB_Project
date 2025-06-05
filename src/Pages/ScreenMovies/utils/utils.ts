
export interface PopularMovie {
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
    vote_average: number;
    vote_count: number;
  }
  
export interface PopularMovieApiResponse {
    page: number;
    results: PopularMovie[];
    total_pages?: number;
    total_results?: number;
  }


  export interface TopRatedMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  
export interface TopRatedMoviesResponse {
    page: number;
    results: TopRatedMovie[];
  }
  
  

  export interface UpcomingMovieResponse {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: UpcomingMovie[];
  }
  
  export interface UpcomingMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  

  export interface NowPlayingMovie {
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
    vote_average: number;
    vote_count: number;
  }
  
  export interface StreaingMovieApiResponse {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: NowPlayingMovie[];
  }
  