
import { getRandomNumber } from './utilsMethod';

const { faker } = require('@faker-js/faker');

export const generatePayload = () => {
  return {
    name: `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`,
    data: {
      year: 2024,
      price: faker.commerce.price(500, 5000, 2), 
      "model": faker.commerce.productDescription(),
      "size": `${getRandomNumber(256, 2000)} GB`
    }
  };
};

// Generate and log random payload
console.log(generatePayload());

