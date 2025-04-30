export interface IMapSlice {
  center: IGeo;
  zoom: number;
  filter: IPlaceFilter;
  placesArray: {
    placeType: string;
    places: Record<string, any>[];
  }[];
  selectedPlaceId: string;
}
