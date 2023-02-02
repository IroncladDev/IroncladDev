import { PageData } from "server/models";

export default async function loadPageData(pageName: string) {
  const page = await PageData.findOne({
    name: pageName,
  });

  return page?.content || {};
}
