import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      _id
      urlPath
      label {
        en
        fi
      }
      icon
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts(
    $page: Int!
    $size: Int!
    $category: ID
    $search: SearchParams
  ) {
    getProducts(
      page: $page
      size: $size
      category: $category
      search: $search
    ) {
      docs {
        _id
        name {
          en
          fi
        }
        price {
          EUR
        }
        category {
          urlPath
        }
        images {
          _id
          filename
        }
      }
      totalPages
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProductById($id: ID!) {
    getProductById(id: $id) {
      _id
      name {
        en
        fi
      }
      price {
        EUR
      }
      customization {
        label {
          fi
          en
        }
        options {
          en
          fi
        }
      }
      description {
        en
        fi
      }
      category {
        _id
        urlPath
        icon
        label {
          en
          fi
        }
      }
      images {
        _id
        filename
      }
      visible
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      _id
      products {
        price {
          EUR
        }
        customization {
          label {
            en
            fi
          }
          option {
            en
            fi
          }
        }
        amount
        product {
          _id
          name {
            en
            fi
          }
          price {
            EUR
          }
          images {
            filename
            _id
          }
          category {
            urlPath
          }
        }
      }
      status
      extrainfo
      billingAddress {
        firstName
        lastName
        address
        zipCode
        city
        country
        company
      }
      deliveryAddress {
        method
        firstName
        lastName
        address
        city
        zipCode
        country
        company
        extra
        phone
      }
      paymentDetails {
        coupons
        details {
          method
          provider
        }
      }
      datetime {
        month
        day
        hours
        minutes
        seconds
        year
      }
    }
  }
`;

export const SHOPPING_CART = gql`
  query CartProducts {
    cartProducts @client
  }
`;

export const ACCOUNT = gql`
  query Account {
    me {
      _id
      username
      email
      accountType
    }
  }
`;

export const GET_FILE_DETAILS = gql`
  query GetFileDetails($id: ID!) {
    getFileById(id: $id) {
      filename
      mimetype
      encoding
      location
    }
  }
`;
