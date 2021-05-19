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
      <RowProductItem name="a" quantity={100} />
      <RowProductItem name="b" quantity={100} />
      <RowProductItem name="c" quantity={100} />
      <RowProductItem name="d" quantity={100} />
    </>
  ),
};
