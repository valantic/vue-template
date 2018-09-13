import address from '../../../../styleguide/mock-data/address';

export default {
  contracts: [
    {
      id: 1,
      name: 'Object A',
      addressId: 99,
    },
    {
      id: 2,
      name: 'Object B',
      addressId: 88,
    },
    {
      id: 3,
      name: 'Object C',
      addressId: 77,
    },
  ],
  shipmentMethods: [
    {
      key: 1,
      name: 'Lieferung',
    },
    {
      key: 2,
      name: 'Abholung',
    },
  ],
  addresses: [
    {
      ...address,
      id: 1,
    },
    {
      ...address,
      id: 2,
      address2: '',
      address1: 'Musterfirma A'
    },
    {
      ...address,
      id: 3,
      address1: 'Musterfirma B'
    },
    {
      ...address,
      id: 4,
    },
    {
      ...address,
      id: 5,
    },
    {
      ...address,
      id: 6,
    },
    {
      ...address,
      id: 7,
    },
    {
      ...address,
      id: 8,
    },
    {
      ...address,
      id: 9,
    },
    {
      ...address,
      id: 10,
    },
    {
      ...address,
      id: 11,
    },
  ],
  pickupLocations: [
    {
      id: 1,
      warehouseId: 1,
      name: 'Lager Basel',
    },
    {
      id: 2,
      warehouseId: 2,
      name: 'Lager Zürich',
    },
    {
      id: 3,
      warehouseId: 3,
      name: 'Lager Bern',
    },
    {
      id: 4,
      warehouseId: 4,
      name: 'Lager St. Gallen',
    },
  ],
  saleNotifications: [
    {
      key: 'email',
      name: 'E-Mail',
    },
    {
      key: 'sms',
      name: 'SMS',
    },
    {
      key: 'fax',
      name: 'Fax',
    },
  ],
};
