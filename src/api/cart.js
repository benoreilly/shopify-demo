import { shopifyQuery } from './shopifyClient';

export async function createCart() {
  const mutation = `
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
      }
    }
  `;
  const data = await shopifyQuery(mutation);
  return data.cartCreate.cart;
}

export async function addToCart(cartId, merchandiseId, quantity = 1) {
  const mutation = `
    mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    title
                    priceV2 { amount currencyCode }
                    product {
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lines: [{ merchandiseId, quantity }],
  };

  const data = await shopifyQuery(mutation, variables);
  return data.cartLinesAdd.cart;
}

export async function getCart(cartId) {
  const query = `
    query getCart($id: ID!) {
      cart(id: $id) {
        id
        totalQuantity
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  title
                  priceV2 { amount currencyCode }
                  product { 
										title 
										featuredImage {
                      url
                      altText
                    }
									}									
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyQuery(query, { id: cartId });
  return data.cart;
}

export async function removeCartItem(cartId, lineId) {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          totalQuantity
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    cartId,
    lineIds: [lineId],
  };

  const data = await shopifyQuery(mutation, variables);
  return data.cartLinesRemove.cart;
}
