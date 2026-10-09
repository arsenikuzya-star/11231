import imgMarmorino from '../../public/assets/products/marmorino-classico.jpg';
import imgStucco from '../../public/assets/products/stucco-veneziano.jpg';
import imgConcrete from '../../public/assets/products/concrete-art.jpg';
import catalogDataRaw from '../data/catalog.json';

// Подменяем строковые пути на импортированные модули
export const catalogData = catalogDataRaw.map(product => {
  const newProduct = { ...product };
  if (product.id === 1 || product.id === 9) {
    newProduct.images = [imgMarmorino];
  } else if (product.id === 2) {
    newProduct.images = [imgStucco];
  } else if (product.id === 5) {
    newProduct.images = [imgConcrete];
  }
  return newProduct;
});
