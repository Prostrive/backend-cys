export const createOpeningTime = (storeIds: string[]) => {
  const openingTimeData = [
    // store[0]
    {
      storeId: storeIds[0],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[0],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[0],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[0],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[0],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[0],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[1],
      dayOfWeek: 6,
      openTime: new Date('2019-01-16 07:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    //store[1]
    {
      storeId: storeIds[1],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[1],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[1],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[1],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[1],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[1],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },

    // store[2]
    {
      storeId: storeIds[2],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 09:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[2],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 09:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[2],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 09:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[2],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 09:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[2],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 09:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[2],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 09:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[2],
      dayOfWeek: 6,
      openTime: new Date('2019-01-16 09:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    // store[3]
    {
      storeId: storeIds[3],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 16:00:00'),
    },
    {
      storeId: storeIds[3],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 16:00:00'),
    },
    {
      storeId: storeIds[3],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 16:00:00'),
    },
    {
      storeId: storeIds[3],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[3],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[3],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },

    // store[4]
    {
      storeId: storeIds[4],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[4],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[4],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[4],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[4],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[4],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[4],
      dayOfWeek: 6,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    // store[5]
    {
      storeId: storeIds[5],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[5],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[5],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[5],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[5],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[5],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    {
      storeId: storeIds[5],
      dayOfWeek: 6,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 02:00:00'),
    },
    // store[6]
    {
      storeId: storeIds[6],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[6],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[6],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[6],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[6],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[6],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },

    // store[7]
    {
      storeId: storeIds[7],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[7],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[7],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[7],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[7],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[7],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    {
      storeId: storeIds[7],
      dayOfWeek: 6,
      openTime: new Date('2019-01-16 08:00:00'),
      closeTime: new Date('2019-01-16 17:00:00'),
    },
    // store[8]
    {
      storeId: storeIds[8],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 06:00:00'),
      closeTime: new Date('2019-01-16 20:00:00'),
    },
    {
      storeId: storeIds[8],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 06:00:00'),
      closeTime: new Date('2019-01-16 20:00:00'),
    },
    {
      storeId: storeIds[8],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 06:00:00'),
      closeTime: new Date('2019-01-16 20:00:00'),
    },
    {
      storeId: storeIds[8],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 06:00:00'),
      closeTime: new Date('2019-01-16 20:00:00'),
    },
    {
      storeId: storeIds[8],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 06:00:00'),
      closeTime: new Date('2019-01-16 20:00:00'),
    },
    {
      storeId: storeIds[8],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 06:00:00'),
      closeTime: new Date('2019-01-16 20:00:00'),
    },
    {
      storeId: storeIds[8],
      dayOfWeek: 6,
      openTime: new Date('2019-01-16 06:00:00'),
      closeTime: new Date('2019-01-16 20:00:00'),
    },
    // store[9]
    {
      storeId: storeIds[9],
      dayOfWeek: 0,
      openTime: new Date('2019-01-16 07:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[9],
      dayOfWeek: 1,
      openTime: new Date('2019-01-16 07:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[9],
      dayOfWeek: 2,
      openTime: new Date('2019-01-16 07:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[9],
      dayOfWeek: 3,
      openTime: new Date('2019-01-16 07:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[9],
      dayOfWeek: 4,
      openTime: new Date('2019-01-16 07:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[9],
      dayOfWeek: 5,
      openTime: new Date('2019-01-16 07:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
    {
      storeId: storeIds[9],
      dayOfWeek: 6,
      openTime: new Date('2019-01-16 07:00:00'),
      closeTime: new Date('2019-01-16 18:00:00'),
    },
  ];
  return openingTimeData;
};
