import { Meta, Story } from '@storybook/react';
import Header from './Header';

export default {
  title: 'ShoppingCart/Header',
  component: Header,
  argTypes: { children: { control: 'text' } },
} as Meta;

interface HeaderProps {
  children: React.ReactNode;
}
const Template: Story<HeaderProps> = ({ ...args }) => <Header {...args} />;

export const Basic = Template.bind({});

Basic.args = { children: '주문목록' };
