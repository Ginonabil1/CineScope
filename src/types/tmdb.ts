export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
}

export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  biography?: string;
  birthday?: string | null;
  place_of_birth?: string | null;
  known_for?: Movie[];
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  tagline: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official?: boolean;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
}

export interface MovieFilters {
  genre?: string;
  year?: string;
  rating?: string;
  sortBy?: string;
}

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface RecentlyViewedMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}

export interface SearchResponseItem {
  id: number;
  media_type: "movie" | "person";
  title?: string;
  name?: string;
  poster_path?: string | null;
  profile_path?: string | null;
  release_date?: string;
  known_for_department?: string;
  known_for?: Movie[];
}
