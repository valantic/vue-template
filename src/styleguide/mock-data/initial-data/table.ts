const row = {
  id: 1,
  firstName: 'Max',
  lastName: 'Muster',
  birthDate: '2018-08-20 18:15:09.587786',
  city: 'St. Gallen',
  company: 'Valantic CEC Schweiz AG',
  children: 3,
  isComplete: false,
};

const list = [];

for (let i = 0; i < 40; i += 1) {
  list.push({
    ...row,
    firstName: `Max-${i}`,
    id: i,
    isComplete: i === 5,
  });
}

export default list;
