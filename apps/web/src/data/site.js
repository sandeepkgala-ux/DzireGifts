export const IMG = {
  heroVilla: 'https://images.hostinger.com/8b9a1798-37f8-43ae-ae30-e749e8e82e7a.png',
  woodPlate: 'https://images.hostinger.com/e34a4e4c-3b6d-45ea-9567-61ad4e780079.png',
  acrylic: 'https://images.hostinger.com/0d814107-e6cb-470d-8818-66d1e36b062b.png',
  islamic: 'https://images.hostinger.com/341a8ea4-1482-4c3e-af31-fd21bdc2dd4f.png',
  giftBox: 'https://images.hostinger.com/1ff96721-f024-41ea-8693-363c4ede1115.png',
  craftsman: 'https://images.hostinger.com/ac18ddd9-109b-4618-9a2f-a79fd189287a.png',
  livingRoom: 'https://images.hostinger.com/9e62b8c1-42b9-4f96-9c4f-f7b0e46a81cb.png',
  accessories: 'https://images.hostinger.com/086dcd96-fb14-4ec4-8161-f8ec4a2bc913.png',
};

export const categories = [
  { name: 'Wooden Name Plates', img: IMG.woodPlate, tag: 'Bestseller' },
  { name: 'Acrylic Name Plates', img: IMG.acrylic, tag: 'Modern' },
  { name: 'Religious & Islamic Decor', img: IMG.islamic, tag: 'Sacred' },
  { name: 'Personalized Gifts', img: IMG.giftBox, tag: 'Loved' },
];

export const products = [
  { id: 1, name: 'Heritage Teak Family Nameplate', price: 3499, mrp: 4999, img: IMG.woodPlate, tag: 'Bestseller', rating: 4.9, reviews: 214, material: 'Teak Wood', category: 'Wooden Name Plates', theme: 'Traditional', color: 'Brown', religion: 'Secular', occasion: 'Housewarming', inStock: true, bestSeller: true, added: 5 },
  { id: 2, name: 'Lumina Acrylic House Plate', price: 2799, mrp: 3599, img: IMG.acrylic, tag: 'Trending', rating: 4.8, reviews: 132, material: 'Acrylic', category: 'Acrylic Name Plates', theme: 'Modern', color: 'Gold', religion: 'Secular', occasion: 'Just Because', inStock: true, bestSeller: true, added: 9 },
  { id: 3, name: 'Noor Islamic Wall Calligraphy', price: 4299, mrp: 5499, img: IMG.islamic, tag: 'New', rating: 5.0, reviews: 87, material: 'Walnut', category: 'Religious & Islamic Decor', theme: 'Calligraphy', color: 'Black', religion: 'Islamic', occasion: 'Festive', inStock: true, bestSeller: false, added: 12 },
  { id: 4, name: 'The Gifting Ritual Box', price: 1999, mrp: 2699, img: IMG.giftBox, tag: 'Editor\u2019s Pick', rating: 4.9, reviews: 301, material: 'Sheesham', category: 'Personalized Gifts', theme: 'Minimal', color: 'Natural', religion: 'Secular', occasion: 'Wedding', inStock: true, bestSeller: true, added: 3 },
  { id: 5, name: 'Villa Grand Entrance Board', price: 6499, mrp: 7999, img: IMG.heroVilla, tag: 'Premium', rating: 4.9, reviews: 64, material: 'Teak Wood', category: 'Wooden Name Plates', theme: 'Traditional', color: 'Brown', religion: 'Secular', occasion: 'Housewarming', inStock: false, bestSeller: false, added: 1 },
  { id: 6, name: 'Artisan Desk Accessory Set', price: 2299, mrp: 2999, img: IMG.accessories, tag: 'Corporate', rating: 4.7, reviews: 118, material: 'Sheesham', category: 'Personalized Gifts', theme: 'Minimal', color: 'Natural', religion: 'Secular', occasion: 'Corporate', inStock: true, bestSeller: false, added: 7 },
  { id: 7, name: 'Ganesha Blessings Wall Frame', price: 3899, mrp: 4899, img: IMG.islamic, tag: 'Sacred', rating: 4.9, reviews: 156, material: 'Walnut', category: 'Religious & Islamic Decor', theme: 'Calligraphy', color: 'Gold', religion: 'Hindu', occasion: 'Festive', inStock: true, bestSeller: true, added: 11 },
  { id: 8, name: 'Aurora Acrylic Apartment Plate', price: 2499, mrp: 3199, img: IMG.acrylic, tag: 'Modern', rating: 4.6, reviews: 74, material: 'Acrylic', category: 'Acrylic Name Plates', theme: 'Modern', color: 'White', religion: 'Secular', occasion: 'Just Because', inStock: true, bestSeller: false, added: 8 },
  { id: 9, name: 'Anniversary Memory Plaque', price: 2899, mrp: 3699, img: IMG.giftBox, tag: 'Loved', rating: 5.0, reviews: 198, material: 'Oak', category: 'Personalized Gifts', theme: 'Traditional', color: 'Brown', religion: 'Secular', occasion: 'Anniversary', inStock: true, bestSeller: true, added: 4 },
  { id: 10, name: 'Bamboo Eco House Sign', price: 1799, mrp: 2299, img: IMG.woodPlate, tag: 'Eco', rating: 4.5, reviews: 52, material: 'Bamboo', category: 'Wooden Name Plates', theme: 'Minimal', color: 'Natural', religion: 'Secular', occasion: 'Housewarming', inStock: true, bestSeller: false, added: 10 },
  { id: 11, name: 'Cross of Grace Wall Art', price: 3299, mrp: 4199, img: IMG.islamic, tag: 'Sacred', rating: 4.8, reviews: 63, material: 'Walnut', category: 'Religious & Islamic Decor', theme: 'Calligraphy', color: 'Black', religion: 'Christian', occasion: 'Festive', inStock: false, bestSeller: false, added: 6 },
  { id: 12, name: 'Brass Inlay Luxe Nameplate', price: 5499, mrp: 6999, img: IMG.heroVilla, tag: 'Premium', rating: 4.9, reviews: 91, material: 'Brass Inlay', category: 'Wooden Name Plates', theme: 'Traditional', color: 'Gold', religion: 'Secular', occasion: 'Wedding', inStock: true, bestSeller: true, added: 2 },
];

export const themes = ['Traditional', 'Modern', 'Minimal', 'Calligraphy'];
export const colors = ['Brown', 'Gold', 'Black', 'White', 'Natural'];
export const religions = ['Secular', 'Islamic', 'Hindu', 'Christian'];
export const categoryNames = ['Wooden Name Plates', 'Acrylic Name Plates', 'Religious & Islamic Decor', 'Personalized Gifts'];

export const occasions = ['Housewarming', 'Wedding', 'Anniversary', 'Corporate', 'Festive', 'Just Because'];
export const materials = ['Teak Wood', 'Walnut', 'Acrylic', 'Sheesham', 'Brass Inlay', 'Bamboo'];

export const testimonials = [
  { name: 'Ananya Kapoor', city: 'Mumbai', text: 'The nameplate outside our villa gets compliments from every guest. The craftsmanship is beyond premium.', rating: 5 },
  { name: 'Rehan Sheikh', city: 'Dubai', text: 'Ordered an Islamic calligraphy piece as a housewarming gift. The gold detailing is simply stunning.', rating: 5 },
  { name: 'Meera & Vikram', city: 'Bengaluru', text: 'Our wedding gift order arrived in the most beautiful packaging. Felt like unboxing a luxury brand.', rating: 5 },
];

export const megaMenu = {
  'Nameplates': ['Wooden Name Plates', 'Acrylic Name Plates', 'Villa Name Boards', 'Apartment Plates', 'Religious Plates', 'Islamic Plates'],
  'Gifts': ['Personalized Gifts', 'Corporate Gifts', 'Wedding Gifts', 'Anniversary Gifts', 'Housewarming', 'Festive Gifts'],
  'Home Decor': ['Wooden Wall Decor', 'Premium Accessories', 'Desk Collection', 'Shop by Material', 'Shop by Occasion'],
};
