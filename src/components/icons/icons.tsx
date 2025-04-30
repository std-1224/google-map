interface IconsTypes {
  GroceryStores: React.JSX.Element;
  Barber: React.JSX.Element;
  PetStore: React.JSX.Element;
  Pharmacy: React.JSX.Element;
  GasStation: React.JSX.Element;
  ConvenienceStore: React.JSX.Element;
  HardwareStore: React.JSX.Element;
  LiquidStore: React.JSX.Element;
  Salon: React.JSX.Element;
  Banks: React.JSX.Element;
  Airport: React.JSX.Element;
  Gym: React.JSX.Element;
  Golf: React.JSX.Element;
  Hospital: React.JSX.Element;
  Dentist: React.JSX.Element;
  Veterinary: React.JSX.Element;
  Star: React.JSX.Element;
  FastFood: React.JSX.Element;
  Bookmark: React.JSX.Element;
  ChevronLeft: React.JSX.Element;
  ChevronRight: React.JSX.Element;
  Hotel: React.JSX.Element;
}

const icon: IconsTypes = {
  GroceryStores: (
    <img
      src={'/Icons/GroceryStore.png'}
      alt='Grocery Store'
      width={20}
      height={20}
    />
  ),
  Barber: <img src={'/Icons/Barber.png'} alt='Barber' width={20} height={20} />,
  Pharmacy: (
    <img src={'/Icons/Pharmacy.png'} alt='Pharmacy' width={20} height={20} />
  ),
  GasStation: (
    <img
      src={'/Icons/Gas Station.png'}
      alt='Gas Station'
      width={20}
      height={20}
    />
  ),
  PetStore: (
    <img src={'/Icons/Petstore.png'} alt='Pet Store' width={20} height={20} />
  ),
  ConvenienceStore: (
    <img
      src={'/Icons/Convenience Store.png'}
      alt='Convenience Store'
      width={20}
      height={20}
    />
  ),
  HardwareStore: (
    <img
      src={'/Icons/Hardware Store.png'}
      alt='Hardward Store'
      width={20}
      height={20}
    />
  ),
  LiquidStore: (
    <img
      src={'/Icons/Liquor Store.png'}
      alt='Liquor Store'
      width={20}
      height={20}
    />
  ),
  Salon: <img src={'/Icons/Salaon.png'} alt='Salaon' width={20} height={20} />,
  Banks: <img src={'/Icons/Bank.png'} alt='Bank' width={20} height={20} />,
  Airport: (
    <img src={'/Icons/Airport.png'} alt='Airport' width={20} height={20} />
  ),
  Gym: <img src={'/Icons/Gym.png'} alt='Gym' width={20} height={20} />,
  Golf: <img src={'/Icons/Golf.png'} alt='Golf' width={20} height={20} />,
  Hospital: (
    <img src={'/Icons/Hospital.png'} alt='Hospital' width={20} height={20} />
  ),
  Dentist: (
    <img src={'/Icons/Dentist.png'} alt='Dentist' width={20} height={20} />
  ),
  Veterinary: (
    <img
      src={'/Icons/Veterinary.png'}
      alt='Veterinary'
      width={20}
      height={20}
    />
  ),
  Star: (
    <svg
      height='20'
      width='20'
      version='1.1'
      id='Capa_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 47.94 47.94'
      xmlSpace='preserve'
      fill='#000000'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <path
          style={{ fill: '#ED8A19' }}
          d='M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z'
        ></path>{' '}
      </g>
    </svg>
  ),
  Bookmark: (
    <img src={'/Icons/Bookmark.png'} alt='Bookmark' width={20} height={20} />
  ),
  ChevronLeft: (
    <img src={'/Icons/ChevronLeft.png'} alt='Star' width={20} height={20} />
  ),
  ChevronRight: (
    <img src={'/Icons/ChevronRight.png'} alt='Star' width={20} height={20} />
  ),
  FastFood: (
    <img src={'/Icons/Fast Food.png'} alt='Food' width={20} height={20} />
  ),
  Hotel: <img src={'/Icons/Hotel.png'} alt='Hotel' width={20} height={20} />,
};

export const chooseIcon = (placeType: string) => {
  switch (placeType) {
    case 'Grocery Stores':
      return icon.GroceryStores;
      break;
    case 'Barber':
      return icon.Barber;
      break;
    case 'Pet Store':
      return icon.PetStore;
      break;
    case 'Pharmacy':
      return icon.Pharmacy;
      break;
    case 'Gas Station':
      return icon.GasStation;
      break;
    case 'Convenience Store':
      return icon.ConvenienceStore;
      break;
    case 'Hardware Store':
      return icon.HardwareStore;
    case 'Liquor Store':
      return icon.LiquidStore;
      break;
    case 'Salon':
      return icon.Salon;
      break;
    case 'Banks':
      return icon.Banks;
    case 'Airport':
      return icon.Airport;
    case 'Gym':
      return icon.Gym;
      break;
    case 'Golf':
      return icon.Golf;
      break;
    case 'Hospital':
      return icon.Hospital;
      break;
    case 'Dentist':
      return icon.Dentist;
      break;
    case 'Veterinary':
      return icon.Veterinary;
      break;
    case 'Star':
      return icon.Star;
      break;
    default:
      break;
  }
};
