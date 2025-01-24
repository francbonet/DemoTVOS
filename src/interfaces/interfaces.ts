import { IconName } from '@fortawesome/fontawesome-common-types';


export interface MenuItem {
    label: string;
    icon: IconName;
    route: string;
    action: () => void;
}

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: string;
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
    video_source: string;
  }