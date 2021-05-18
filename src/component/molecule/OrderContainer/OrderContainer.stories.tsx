import { Meta, Story } from '@storybook/react';
import RowProductItem from '../RowProductItem/RowProductItem';
import OrderContainer, { OrderContainerProps } from './OrderContainer';

export default {
  title: 'ShoppingCart/OrderContainer',
  component: OrderContainer,
} as Meta;

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
