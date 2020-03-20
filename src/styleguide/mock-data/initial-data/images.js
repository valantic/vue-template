import image from '../data-object/image';

const amount = 20;
const dynamicList = [];

for (let index = 1; index <= amount; index += 1) {
  dynamicList.push({
    ...image,
    idProductImage: index,
  });
}

export default dynamicList;
