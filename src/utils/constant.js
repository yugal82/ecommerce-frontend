export const categories = [
  'T-shirts',
  'Shirts',
  'Tank tops',
  'Hoodies',
  'Sweaters',
  'Sweatshirts',
  'Jackets',
  'Blazers',
  'Coats',
  'Jeans',
  'Pants',
  'Trousers',
  'Leggings',
  'Shorts',
  'Skirts',
  'Cocktail dresses',
  'Party dresses',
  'Sundresses',
  'Workout tops',
  'Sports bras',
  'Workout leggings',
  'Sweatpants',
  'Track pants',
  'Athletic shorts',
  'Yoga pants',
  'Running shorts',
  'Winter jackets',
  'Hats',
  'Caps',
  'Belts',
  'Ties',
  'Socks',
  'Sunglasses',
  'Watches',
  'Jewelry',
  'Sneakers',
  'Boots',
  'Flats',
  'Sandals',
  'Heels',
  'Slippers',
  'Flip-flops',
];

export const brands = [
  'Nike',
  'Adidas',
  'Puma',
  'Reebok',
  'Levis',
  'Lee',
  'Wrangler',
  'UCB (United Colors of Benetton)',
  'Arrow',
  'Pepe Jeans',
  'Van Heusen',
  'Tommy Hilfiger',
  'Calvin Klein',
  'Ray-Ban',
  'H&M (Hennes & Mauritz)',
  'Zara',
  'Forever 21',
  'Mango',
  'Vero Moda',
  'ONLY',
  'Jack & Jones',
  'Roadster',
  'Flying Machine',
  'HRX by Hrithik Roshan',
  'Biba',
  'W for Woman',
  'Max',
  'Bata',
  'Woodland',
  'Fossil',
  'Daniel Klein',
  'Timex',
  'Casio',
  'Sony',
  'Apple',
  'Samsung',
];

export const sizes = [28, 30, 32, 34, 36, 38, 40, 42, 44, 46];
export const colors = ['White', 'Beige', 'Blue', 'Brown', 'Green', 'Purple'];

// export const BASE_URL = 'http://localhost:8080/';
export const BASE_URL = 'https://ecommerce-clothing-api.vercel.app/';

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => reject(err);
  });
};

export const discountedPrice = (product) => {
  return Math.round(product?.price * (1 - product?.discountPercentage / 100), 2);
};
