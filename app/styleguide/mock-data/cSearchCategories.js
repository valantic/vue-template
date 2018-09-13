/*
 * eslint-disable
 */
const list = [];
const entries = 12;

for (let i = 0; i <= entries; i += 1) {
  list.push({
    id: i,
    title: 'Home 502 LED',
    parentName: 'Wand-/Deckenleuchten RZB',
    url: '#',
    docCount: i,
  });
}

export default {
  categories: list,
};
