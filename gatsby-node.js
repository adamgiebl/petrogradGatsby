const fetch = require(`node-fetch`);

const fetchJson = (url) => fetch(url).then((res) => res.json());

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allProductType {
        nodes {
          id
          image
        }
      }
    }
  `);
  data.allProductType.nodes.forEach((edge) => {
    const slug = edge.image;
    console.log("generating", edge.id);
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/Detail.js`),
      context: { slug: slug, id: edge.id },
    });
  });
};

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const productList = await fetchJson(
    "https://kea-alt-del.dk/t5/api/productlist"
  );

  const allDetailFetches = productList.map((prod) =>
    fetchJson(`https://kea-alt-del.dk/t5/api/product?id=${prod.id}`)
  );
  Promise.all(allDetailFetches).then((course) => {
    course.forEach((course) => {
      const nodeMeta = {
        parent: null,
        children: [],
        internal: {
          type: `productDetailType`,
          mediaType: `text/html`,
          contentDigest: createContentDigest(course),
        },
        ...course,
      };
      console.log("generating Detail", nodeMeta.name);
      createNode(nodeMeta);
    });
  });
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
