import { Meta, Story } from '@storybook/react';
import ShoppingCartIcon from './ShoppingCartIcon';

export default {
  title: 'ShoppingCart/ShoppingCartIcon',
  component: ShoppingCartIcon,
} as Meta;

interface ShoppingCartIconProps {
  scale: string;
  color: string;
}
const Template: Story<ShoppingCartIconProps> = ({ ...args }) => (
  <ShoppingCartIcon {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  scale: '1.0',
};
