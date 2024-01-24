import { Language } from '@prisma/client';

export const translationFilter = async (
  language: Language,
  translationModel: any,
) => {
  const result = await translationModel.aggregate({
    _count: {
      id: true,
    },
    where: {
      language: language,
    },
  });

  return result._count.id ? { language } : { language: Language.en };
};
