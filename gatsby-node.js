const fetch = require(`node-fetch`);

const fetchJson = (url) => fetch(url).then((res) => res.json());

exports.createPages = async function ({ actions, graphql }) {
  const {
    data: {
      allProductType: { nodes: courses },
    },
  } = await graphql(`
    query {
      allProductType {
        nodes {
          id
          image
          category
        }
      }
    }
  `);
  courses.forEach((edge, i) => {
    const slug = edge.image;
    console.log("generating", edge.id);
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/components/Detail.js`),
      context: {
        slug: slug,
        id: edge.id,
        category: edge.category,
        hello: "hoj",
        prev: i === 0 ? null : courses[i - 1].image,
        next: i === courses.length - 1 ? null : courses[i + 1].image,
      },
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
