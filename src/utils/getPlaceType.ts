import checkOptions from '@/data/checkOptions';

export const getPlaceType = (placeType: string) => {
  for (let options of checkOptions) {
    if (options.value === placeType) {
      return options.label;
    }

    if (options.options) {
      for (let option of options.options) {
        if (option.value === placeType) {
          return option.label;
        }
      }
    }
  }

  return '';
};
