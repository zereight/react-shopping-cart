import { Meta, Story } from '@storybook/react';
import Spinner from './Spinner';

export default {
  title: 'ShoppingCart/Spinner',
  component: Spinner,
  argTypes: { children: { control: 'text' } },
} as Meta;

interface SpinnerProps {
  scale: string;
}
const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  scale: '1.0',
};
