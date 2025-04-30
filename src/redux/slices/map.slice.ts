import { createSlice } from '@reduxjs/toolkit';
import { usCenter } from '@/data/location';
import { IMapSlice } from '../types/map.feature';

const initialState: IMapSlice = {
  center: usCenter,
  zoom: 4,
  filter: {
    radius: 10,
    placeTypes: [],
  },
  placesArray: [],
  selectedPlaceId: '',
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setCenter(state, action) {
      state.center = action.payload;
      return state;
    },
    setZoom(state, action) {
      state.zoom = action.payload;
      return state;
    },
    setPlaceType(state, action) {
      state.filter.placeTypes = action.payload.placeTypes;
      return state;
    },
    setSearchRadius(state, action) {
      state.filter.radius = action.payload.radius;
      return state;
    },
    setPlacesArray(state, action) {
      state.placesArray = [...action.payload];
      return state;
    },
    setSelectedPlaceId(state, action) {
      state.selectedPlaceId = action.payload;
    },
  },
});

export const {
  setCenter,
  setZoom,
  setSearchRadius,
  setPlaceType,
  setPlacesArray,
  setSelectedPlaceId,
} = mapSlice.actions;

export default mapSlice.reducer;
