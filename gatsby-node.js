const fetch = require(`node-fetch`);

const fetchJson = (url) => fetch(url).then((res) => res.json());

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const productList = await fetchJson(
    "https://kea-alt-del.dk/t5/api/productlist"
  );

  productList.forEach((course) => {
    const nodeMeta = {
      parent: null,
      children: [],
      internal: {
        type: `productType`,
        mediaType: `text/html`,
        contentDigest: createContentDigest(course),
      },
      ...course,
    };
    createNode(nodeMeta);
  });

  const categoryList = await fetchJson(
    "https://kea-alt-del.dk/t5/api/categories"
  );

  categoryList.forEach((category) => {
    const nodeMeta = {
      id: category,
      parent: null,
      name: category,
      children: [],
      internal: {
        type: `categoryType`,
        mediaType: `text/html`,
        contentDigest: createContentDigest(category),
      },
    };
    createNode(nodeMeta);
  });
};
