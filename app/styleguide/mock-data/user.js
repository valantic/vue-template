import address from './address';
import permissions from './permissions';

const accountLinks = [
  {
    name: 'Auftragshistory',
    url: '#',
    isActive: false,
    key: 'history',
  },
  {
    name: 'Benutzer',
    url: '#',
    isActive: true,
    key: 'profile',
  },
  {
    name: 'Offerte',
    url: '#',
    isActive: false,
    key: 'quotes',
  },
  {
    name: 'Addressen & Objekte',
    url: '#',
    isActive: false,
    key: 'addresses-objects',
  },
  {
    name: 'Benutzerverwaltung',
    url: '#',
    isActive: false,
    key: 'users',
  },
  {
    name: 'Preisliste',
    url: '#',
    isActive: false,
    key: 'price-list',
  },
  {
    name: 'Service',
    url: '#',
    isActive: false,
    key: 'service',
  },
];

const orderOptions = {
  addresses: [
    {
      ...address,
      id: '1',
      company: 'Firma 01',
      address1: 'Example address 01',
    },
    {
      ...address,
      id: '2',
      company: 'Firma 02',
      address1: 'Example address 02',
    },
    {
      ...address,
      id: '3',
      company: 'Firma 03',
      address1: 'Example address 03',
    },
    {
      ...address,
      id: '4',
      company: 'Firma 04',
      address1: 'Example address 04',
    }
  ],
  pickupLocations: [
    {
      id: '1',
      warehouseId: 1,
      name: 'Lager Basel',
    },
    {
      id: '2',
      warehouseId: 2,
      name: 'Lager Zürich',
    },
    {
      id: '3',
      warehouseId: 3,
      name: 'Lager Bern',
    },
    {
      id: '4',
      warehouseId: 4,
      name: 'Lager St. Gallen',
    },
  ],
  activeAddressId: '2',
  activePickupLocationId: '3',
  deliverySetting: false,
  partDelivery: true,
};

const userData = {
  firstName: 'Max',
  lastName: 'Mustermann',
  email: 'test@test.com',
  phone: '01234646',
  mobile: '03023023023',
  fax: '2304324',
  locale: 'DE',
  userId: '1896MdR',
  role: 'Administrator',
  locales: [
    {
      value: 'DE',
      label: 'Deutsch'
    }, {
      value: 'EN',
      label: 'Englisch'
    }
  ]
};

const confirmationSettings = {
  confirmationTypes: [
    {
      name: 'Confirmation Type 1',
      id: '1',
    },
    {
      name: 'Confirmation Type 2',
      id: '2',
    },
    {
      name: 'Confirmation Type 3',
      id: '3',
    },
    {
      name: 'Confirmation Type 4',
      id: '4',
    }
  ],
  activeConfirmationType: '2',
  confirmationEmail1: 'max.muster@valantic.com',
  confirmationEmail2: '',
};

export default {
  profile: {
    ...orderOptions,
    ...userData,
    ...confirmationSettings,
    ...permissions,
  },
  accountLinks,
};
