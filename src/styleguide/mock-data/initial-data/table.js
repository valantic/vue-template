import faker from 'faker/locale/en';

export default Array(40)
  .fill(null)
  .map((item, index) => ({
    id: index,
    isComplete: index === 5,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: '2018-08-20 18:15:09.587786',
    city: faker.address.city(),
    company: faker.company.companyName(),
    children: 3,
  }));
