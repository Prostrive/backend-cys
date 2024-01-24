export async function createStore(categoryIds: string[]) {
  // Create categories

  const storesData = [
    {
      name: 'ALBERT HEIJN',
      categoryId: categoryIds[3],
      thumbnailImageUrl:
        'https://th.bing.com/th?id=OIP.3Tm7wp2LH29S-J9jgeTYZwHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
      logoImageUrl:
        'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/a20f37ff-0c8c-43d8-bdd3-0a999f28107c.jpg',
      stripeId: 'acct_1Ml9D3AXf3DzyyIM',
      stripeActivated: true,
      latitude: 51.48949,
      longitude: 5.47038,
      address: {
        zip: '321',
        street: '123',
        city: 'Eindhoven',
        province: 'Camuslaan',
        country: 'Netherlands',
      },
    },
    {
      name: 'JUMBO',
      categoryId: categoryIds[3],
      thumbnailImageUrl:
        'https://th.bing.com/th/id/OIP.GtIZfk_i6fconD-jJoTgyAHaE0?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      logoImageUrl:
        'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/a20f37ff-0c8c-43d8-bdd3-0a999f28107c.jpg',
      stripeId: 'acct_1Ml9F5FFyeQbTjIm',
      stripeActivated: true,
      latitude: 51.4366,
      longitude: 5.478,
      address: {
        zip: '5611',
        street: '28',
        city: 'Eindhoven',
        province: 'Keizersgracht',
        country: 'Netherlands',
      },
    },
    {
      name: 'LIDL',
      categoryId: categoryIds[3],
      thumbnailImageUrl:
        'https://th.bing.com/th/id/OIP.6zEREZjMvjmLARm8T7V4PQHaE8?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      logoImageUrl:
        'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/a20f37ff-0c8c-43d8-bdd3-0a999f28107c.jpg',
      stripeId: 'acct_1Ml9GjG2Dv90rrhV',
      stripeActivated: true,
      latitude: 51.4366,
      longitude: 5.478,
      address: {
        zip: '3232',
        street: '28',
        city: 'Eindhoven',
        province: 'Keizersgracht',
        country: 'Netherlands',
      },
    },
    {
      name: 'ALDI',
      categoryId: categoryIds[3],
      thumbnailImageUrl:
        'https://www.gannett-cdn.com/presto/2019/04/22/PKNS/09cae563-3a7b-41f3-a0ea-d5b131533c41-Aldi.jpg?crop=7359,4125,x0,y0&width=3200&height=1680&fit=bounds',
      logoImageUrl:
        'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/a20f37ff-0c8c-43d8-bdd3-0a999f28107c.jpg',
      stripeId: 'acct_1Ml9IeCXg8hQ0hyM',
      stripeActivated: true,
      latitude: 51.4366,
      longitude: 5.478,
      address: {
        zip: '3232',
        street: '28',
        city: 'Eindhoven',
        province: 'Keizersgracht',
        country: 'Netherlands',
      },
    },
    {
      name: 'PLUS',
      categoryId: categoryIds[3],
      thumbnailImageUrl:
        'https://images.pexels.com/photos/6605208/pexels-photo-6605208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      logoImageUrl:
        'https://img.cdn4dd.com/p/fit=contain,width=100,height=100,format=auto,quality=95/media/restaurant/cover_square/a20f37ff-0c8c-43d8-bdd3-0a999f28107c.jpg',
      stripeId: 'acct_1Ml9M6CLQEdyLeNR',
      stripeActivated: true,
      latitude: 51.46034107223806,
      longitude: 5.470751523971558,
      address: {
        zip: '3232',
        street: '333',
        city: 'Eindhoven',
        province: 'Keizersgracht',
        country: 'Netherlands',
      },
    },
    {
      name: 'H&M',
      categoryId: categoryIds[5],
      thumbnailImageUrl:
        'https://imgs.search.brave.com/T43SQRkZkwSfvk5jd-Dlmuq6e04iXa5AIVaeDPUkX08/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9hc3Nl/dHMucmFwcGxlci5j/b20vRkEzMzc0RTBB/Mzk3NDY3OUJFRTYx/NDRFQUZCNjBBREMv/aW1nLzBBOEY5RDc0/MDc2MDQ5MjY4OTlE/RDU2MUQ4MURCMEM4/LzIwMTYwNjIyLWht/LmpwZw',
      logoImageUrl:
        'https://imgs.search.brave.com/-gPrZX8YUKmVxk7dtDDAdXri0i6R81NucYp-4z2RDfs/rs:fit:768:768:1/g:ce/aHR0cHM6Ly9idWN1/cmVzdGltYWxsLnJv/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE2/LzEyL2xvZ29faG5t/XzEwMjR4LTc2OHg3/NjgucG5n',
      stripeId: 'acct_1MjfSdIIu9z7FzdP',
      stripeActivated: true,
      latitude: 51.43850093752521,
      longitude: 5.480538435108739,
      address: {
        zip: '5611',
        street: '13',
        city: 'Eindhoven',
        province: 'Heuvel Galerie',
        country: 'Netherlands',
      },
    },
    {
      name: 'ZARA',
      categoryId: categoryIds[5],
      thumbnailImageUrl:
        'https://imgs.search.brave.com/2b99sCE9iTH-H4OlFNGUSJjORYEEpJqerBjNmAIEN2I/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9ibG9n/cy1pbWFnZXMuZm9y/YmVzLmNvbS9jbGFy/ZW9jb25ub3IvZmls/ZXMvMjAxNS8wNi9a/YXJhX3N0b3JlX2F0/X1dlc3RmaWVsZF9T/eWRuZXktZTE0MzMz/NTI3OTMxODUtMTk0/MHgxNDUzLmpwZw',
      logoImageUrl:
        'https://imgs.search.brave.com/mZ0sbuDL3pYykyGK0FVXRH1AdAaKQSSGddCfkCtud7w/rs:fit:1024:1024:1/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzZhLzRi/LzYwLzZhNGI2MGFm/ZDdjMTQ4MmRhYzhm/ODY0ZTRlMzdjZDhj/LmpwZw',
      stripeId: 'acct_1MjehfJfPX8wj4kY',
      stripeActivated: true,
      latitude: 51.44145632257843,
      longitude: 5.476394891738892,
      address: {
        zip: '5611',
        street: '21',
        city: 'Eindhoven',
        province: 'De Bijenkorf',
        country: 'Netherlands',
      },
    },
    {
      name: 'Wehkamp',
      categoryId: categoryIds[5],
      thumbnailImageUrl:
        'https://imgs.search.brave.com/2XOLLaWpzDftLgK-qNi7nYm4RUZTj0zwHBcbsgmu-zg/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5C/YkpBRDI1MVp0U3Bk/YWkxY2tXOWxRSGFF/SyZwaWQ9QXBp',
      logoImageUrl:
        'https://imgs.search.brave.com/v4JQ5N_EDufCN_eyeSHJ3CCzF6ma_vy4EGAUGLWz8RQ/rs:fit:538:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5p/Y1ZnVHhaZ0RTMDR0/eHc1dXVKSTF3SGFH/aCZwaWQ9QXBp',
      stripeId: 'acct_1Ml9VUKmGe5tBqYf',
      stripeActivated: true,
      latitude: 51.4362182,
      longitude: 5.47446,
      address: {
        zip: '3232',
        street: '111',
        city: 'Eindhoven',
        province: 'Hendrikstraat',
        country: 'Netherlands',
      },
    },
    {
      name: 'Kruidvat',
      categoryId: categoryIds[0],
      thumbnailImageUrl:
        'https://imgs.search.brave.com/E-QAZgmX5psbXgCr-CKeMzSmrs6pz-jz6pLuOoh-qr8/rs:fit:936:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5M/b05ydXctVWw5T1FS/bXFod3I0WmNnSGFE/dyZwaWQ9QXBp',
      logoImageUrl:
        'https://imgs.search.brave.com/Y0FkBluD66R0Alt2Au7FLBkFpRa0eiuF9igfy7MO9Qk/rs:fit:608:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5F/c1M5d011TmhoZ2R1/aVM5VTdHMHpRSGFG/eCZwaWQ9QXBp',
      stripeId: 'acct_1Ml9X7KcEFqhb9qT',
      stripeActivated: true,
      latitude: 51.441137194633484,
      longitude: 5.453247427940369,
      address: {
        zip: '3232',
        street: '42',
        city: 'Eindhoven',
        province: 'Kruidvat',
        country: 'Netherlands',
      },
    },
    {
      name: 'Etos',
      categoryId: categoryIds[0],
      thumbnailImageUrl:
        'https://imgs.search.brave.com/dJu1HdsYjptCCf76R-gtQDtLQeCrsax3honegV8IS94/rs:fit:844:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5t/OEUtOURYUklvZ2g3/Vk1NTUlULVZ3SGFF/SyZwaWQ9QXBp',
      logoImageUrl:
        'https://imgs.search.brave.com/6pkX4S3Im-IA8ogFiD9NZ6xz4wWPZ_1wKzROzJvEhwM/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/bG95YWx0eWZhY3Rz/Lm5sL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE5LzA2L2V0b3Mt/bG9nby5wbmc',
      stripeId: 'acct_1Ml9YiCuvYYBIb3H',
      stripeActivated: true,
      latitude: 51.4408773,
      longitude: 5.4535384,
      address: {
        zip: '5616',
        street: '137',
        city: 'Eindhoven',
        province: 'Strijpsestraat',
        country: 'Netherlands',
      },
    },
  ];

  return storesData;
}
