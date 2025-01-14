import { db } from '~/server/db';

export const getLanguageOptionsServer = async () => {
  const langs = await db.query.languages.findMany({
    orderBy: (model, { asc }) => asc(model.name),
  });

  return langs;
};
