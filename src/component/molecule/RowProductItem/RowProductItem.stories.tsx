import { Meta, Story } from '@storybook/react';
import { numberWithCommas } from '../../../util';
import RowProductItem, { RowProductItemProps } from './RowProductItem';

export default {
  title: 'ShoppingCart/RowProductItem',
  component: RowProductItem,
  argTypes: { children: { control: 'text' } },
} as Meta;

const Template: Story<RowProductItemProps> = (args) => (
  <RowProductItem {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  name: '브랜의 풀업 셋트',
  price: `${numberWithCommas(100)} 원 / `,
  amount: `수량: ${100} 개`,
  img: 'https://zereight.github.io/react-payments/static/media/pullup.befeeb55.gif',
};
