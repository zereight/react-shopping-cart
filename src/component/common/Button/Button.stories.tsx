import { Meta, Story } from '@storybook/react';
import Button from './Button';

export default {
  title: 'ShoppingCart/Button',
  component: Button,
  argTypes: { children: { control: 'text' } },
} as Meta;

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}
const Template : Story<ButtonProps> = (args) => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: '장바구니',
};
