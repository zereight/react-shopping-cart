import { Meta, Story } from '@storybook/react';
import ColumnProductItem from './ColumnProductItem';

export default {
  title: 'ShoppingCart/ColumnProductItem',
  component: ColumnProductItem,
  argTypes: { children: { control: 'text' } },
} as Meta;

interface ColumnProductItemProps {
  img: string;
  name: string;
  price: string;
  isVisibleIcon: boolean;
  isLiked?: boolean;
  onClickShoppingCartIcon: () => void | undefined;
  onClickLikeButton: () => void;
}

const Template: Story<ColumnProductItemProps> = (args) => (
  <ColumnProductItem {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  name: '브랜',
  price: '100',
  img: 'https://zereight.github.io/react-payments/static/media/pullup.befeeb55.gif',
  onClickShoppingCartIcon: () => {alert('장바구니 버튼 클릭');},
};
