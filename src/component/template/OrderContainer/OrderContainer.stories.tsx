import { Meta, Story } from '@storybook/react';
import RowProductItem from '../../common/ProductItem/RowProductItem/RowProductItem';
import OrderContainer from './OrderContainer';

export default {
  title: 'ShoppingCart/OrderContainer',
  component: OrderContainer,
} as Meta;

interface OrderContainerProps {
  orderId: string;
  children: React.ReactNode;
}
const Template: Story<OrderContainerProps> = ({ ...args }) => (
  <OrderContainer {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  orderId: '1',
  children: (
    <>
      <RowProductItem name="a" amount={`수량: ${100} 개`} />
      <RowProductItem name="b" amount={`수량: ${100} 개`} />
      <RowProductItem name="c" amount={`수량: ${100} 개`} />
      <RowProductItem name="d" amount={`수량: ${100} 개`} />
    </>
  ),
};
