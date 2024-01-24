import { Prisma } from '@prisma/client';
import { customAlphabet } from 'nanoid';

export const generateOrderNumber = (customerAddress) => {
  const generateID = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 6);
  const nanodId = generateID();

  // Creating an orderNumber that depends on the delivery location
  const address = customerAddress?.address as Prisma.JsonObject;
  const city = address.city.toString().slice(0, 3).toLowerCase();
  const orderNumber = `nl-${city}-${nanodId}`;
  return orderNumber;
};
