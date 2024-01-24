import { Language } from '@prisma/client';

export const ProductCategories = [
  {
    imageUrl:
      'https://storage.googleapis.com/collect-your-shopping-landingpage/cg-grocery.png',
    thumbnailUrl:
      'https://storage.googleapis.com/collect-your-shopping-landingpage/cg-grocery.png',
    translations: {
      create: [
        {
          language: Language.en,
          name: 'Groceries',
          description: 'Groceries',
        },
      ],
    },
  },

  {
    imageUrl:
      'https://storage.googleapis.com/collect-your-shopping-landingpage/cg-pharmacy.png',
    thumbnailUrl:
      'https://storage.googleapis.com/collect-your-shopping-landingpage/cg-pharmacy.png',
    translations: {
      create: [
        {
          language: Language.en,
          name: 'Pharmacy',
          description: 'Pharmacy',
        },
      ],
    },
  },

  {
    imageUrl:
      'https://storage.googleapis.com/collect-your-shopping-landingpage/cg-clothing.png',
    thumbnailUrl:
      'https://storage.googleapis.com/collect-your-shopping-landingpage/cg-clothing.png',
    translations: {
      create: [
        {
          language: Language.en,
          name: 'Clothes',
          description: 'Clothes',
        },
      ],
    },
  },
  {
    imageUrl:
      'https://storage.googleapis.com/collect-your-shopping-landingpage/cg-electric.png',
    thumbnailUrl:
      'https://storage.googleapis.com/collect-your-shopping-landingpage/cg-electric.png',
    translations: {
      create: [
        {
          language: Language.en,
          name: 'Electronics',
          description: 'Electronics',
        },
      ],
    },
  },
];
