const endpoint = `https://${import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`;

export async function shopifyQuery(query, variables = {}) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) console.error(json.errors);
  return json.data;
}
