interface ProductType {
  id: string;
  img: string;
  name: string;
  price: string;
}

interface CheckedItemType {
  id: string;
  amount: number;
}

interface OrderType {
  id: string;
  orderedProductList: Array<{ id: string; amount: number }>;
}

export { ProductType, CheckedItemType, OrderType };
