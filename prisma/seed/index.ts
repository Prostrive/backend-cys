import {
  Language,
  PrismaClient,
  PushNotificationAudience,
} from '@prisma/client';
import { StoreCategories } from './data/store-category';
import { ProductCategories } from './data/product-category';
import { createOpeningTime } from './data/opening-time';
import { createStore } from './data/store';
import { createProducts } from './data/products';
import { customerSearch } from './data/customer-search';
const prisma = new PrismaClient();

async function runSeeders() {
  // Create app setting
  await prisma.appSettings.create({
    data: { id: 1, deliveryFee: 3, isActive: true },
  });
  // Creating accounts
  const customer = await prisma.customer.create({
    data: {
      email: 'boris@prospire.io',
      userId: '1lCdsM4JBOQd0zJt82CSXwJ2ygk1',
      name: 'John',
      notificationTokens: ['ExponentPushToken[YEfZ_SHxPEHWDRN4DyOD4F]'],
    },
  });

  await prisma.admin.create({
    data: {
      email: 'admin@cys.nl',
      name: 'Admin',
      userId: 'eM4NPwmr8ThT9XspJ68buxx0gmS2',
    },
  });

  //   Creating test address
  await prisma.customerAddress.create({
    data: {
      address: {
        street: 'Test Street',
        city: 'Test City',
        state: 'Test State',
        zip: 'Test Zip',
        country: 'Test Country',
      },
      latitude: 0,
      longitude: 0,
      formattedAddress: 'Test street, Test City, Test State, Test Country',
      customer: {
        connect: {
          id: customer.id,
        },
      },
      primary: true,
    },
  });
  //   Creating dummy user search
  await Promise.all(
    customerSearch.map(async (search) => {
      await prisma.customerSearch.create({
        data: { searchTerm: search.searchTerm, customerId: customer.id },
      });
    }),
  );

  // creating all categories and pass an array of category ids
  const createdCategories = await Promise.all(
    StoreCategories.map(async (category) => {
      const createdCategory = await prisma.storeCategory.create({
        data: category,
      });
      return createdCategory.id;
    }),
  );

  // Create stores and pass an array of store ids
  const storesData = await createStore(createdCategories);
  const createdStores = await Promise.all(
    storesData.map(async (store) => {
      const createdStore = await prisma.store.create({
        data: store,
      });
      return createdStore.id;
    }),
  );

  //   Creating store manager on 1 store
  await prisma.storeManager.create({
    data: {
      email: 'storemanager@cys.nl',
      name: 'Store Manager',
      userId: 'Gqelhpf90PTIVE0QeTuTkzKqrUx2',
      storeId: createdStores[0],
    },
  });
  // Create opening time for stores
  const openingTimeData = await createOpeningTime(createdStores);
  await Promise.all(
    openingTimeData.map(async (time) => {
      return await prisma.storeOpeningTime.create({ data: time });
    }),
  );
  // Create product category
  const createdProductCategories = await Promise.all(
    ProductCategories.map(async (category) => {
      const createdCategory = await prisma.productCategory.create({
        data: category,
      });
      return createdCategory.id;
    }),
  );
  //   Create products for each stores
  const productsData = await createProducts(
    createdStores,
    createdProductCategories,
  );

  const createdProducts = await Promise.all(
    productsData.map(async (product) => {
      const createdProduct = await prisma.product.create({
        data: {
          price: product.price,
          storeId: product.storeId,
          categoryId: product.categoryId,
        },
      });
      if (createdProduct) {
        await prisma.productImage.create({
          data: { url: product.url, productId: createdProduct.id },
        });
        await prisma.productTranslation.create({
          data: {
            name: product.name,
            description: product.description,
            language: Language.en,
            productId: createdProduct.id,
            unit: '4 pieces',
          },
        });
      }
      return createdProduct.id;
    }),
  );
  //   Create notifs
  await prisma.pushNotifications.create({
    data: {
      body: 'Test',
      audience: PushNotificationAudience.CUSTOMERS,
      scheduledSendTime: '2022-12-28T06:44:25.577Z',
    },
  });
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });
