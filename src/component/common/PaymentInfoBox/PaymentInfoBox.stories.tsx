import { Meta, Story } from '@storybook/react';
import PaymentInfoBox from './PaymentInfoBox';

export default {
  title: 'ShoppingCart/PaymentInfoBox',
  component: PaymentInfoBox,
  argTypes: { children: { control: 'text' } },
} as Meta;

interface PaymentInfoBoxProps {
  title: string;
  detailText: string;
  price: string;
  buttonText: string;
  onClick: () => void;
  isDisable: boolean;
}

const Template: Story<PaymentInfoBoxProps> = (args) => (
  <PaymentInfoBox {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  title: '결제예상금액',
  detailText: '결제예상금액',
  price: '21,700',
  buttonText: '주문하기(2개)',
  onClick: () => alert('주문하기 버튼 클릭'),
};
