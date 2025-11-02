import { shopifyQuery } from './shopifyClient';

export async function fetchProducts() {
  const query = `
{
  products(first: 30) {
    edges {
      node {
        id
        title
        handle
        tags
        description
        descriptionHtml
				isGiftCard
				productType
        images(first: 5) {
          edges {
            node {
              id
              src
              altText
            }
          }
        }
				variants(first: 10) {
					edges {
						node {
							sku
							id
							title
							price {
								amount
								currencyCode
							}
							compareAtPrice {
								amount
								currencyCode
							}
						}
					}
				}
      }
    }
  }
}
`;

  try {
    const data = await shopifyQuery(query);
    if (!data?.products?.edges) {
      console.error('Invalid product response:', data);
      return [];
    }

    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
