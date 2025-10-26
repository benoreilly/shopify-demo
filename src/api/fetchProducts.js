export async function fetchProducts() {
  const endpooint = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`;

  const query = `
{
  products(first: 30) {
    edges {
      node {
        id
        title
        handle
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
    const response = await fetch(endpooint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const result = await response.json();

    if (!result.data || !result.data.products) {
      console.error('Invalid response structure:', result);
      return [];
    }

    return result.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
