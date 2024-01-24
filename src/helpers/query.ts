import { Prisma, PrismaClient } from '@prisma/client';

export async function upsertRecords(
  records: any[] | null | undefined,
  model: Prisma.ModelName,
  foreignkey: string,
  foreignKeyValue: string,
): Promise<void> {
  if (!records) return;

  const prisma = new PrismaClient();

  try {
    await prisma.$transaction(async () => {
      const recordIds = records
        .filter((record) => record.id != null)
        .map((record) => record.id);

      await prisma[model].deleteMany({
        where: {
          [foreignkey]: foreignKeyValue,
          NOT: {
            id: { in: recordIds },
          },
        },
      });

      await Promise.all(
        records.map(async (record) => {
          if (record.id) {
            await prisma[model].update({
              where: {
                id: record.id,
              },
              data: {
                ...record,
                [foreignkey]: foreignKeyValue,
              },
            });
          } else {
            await prisma[model].create({
              data: {
                ...record,
                [foreignkey]: foreignKeyValue,
              },
            });
          }
        }),
      );
    });
  } catch (error) {
    // Handle the error here
    console.error(error);
  }
}
