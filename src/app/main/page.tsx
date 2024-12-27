import { db } from '~/server/db';

import { WordGenerator } from '~/components/client/WordGenerator';

const getLanguages = async () => {
  const langs = await db.query.languages.findMany({
    orderBy: (model, { asc }) => asc(model.name),
  });

  return langs;
};

export default async function MainPage() {
  const languages = await getLanguages();

  return <WordGenerator languages={languages} />;
}
