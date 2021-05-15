interface ProductProps {
  id: string;
  img: string;
  name: string;
  price: string;
}

interface OrderState {
  id: string;
  orderedProductList: Array<{ id: string; amount: number }>;
}

export { ProductProps, OrderState };
