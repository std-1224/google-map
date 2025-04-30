export {};

declare global {
  export interface IGeo {
    lat: number;
    lng: number;
  }

  export interface IPlaceFilter {
    radius: number;
    placeTypes: string[];
  }

  export interface IPlace {
    geometry: {
      location: IGeo;
    };
    distance?: number;
    place_id: string;
    route?: any;
    strokeColor?: string
  }
}
