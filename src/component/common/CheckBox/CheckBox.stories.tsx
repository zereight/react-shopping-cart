import { Meta, Story } from '@storybook/react';
import CheckBox from './CheckBox';

export default {
  title: 'ShoppingCart/CheckBox',
  component: CheckBox,
  argTypes: { children: { control: 'text' } },
} as Meta;

interface CheckBoxProps {
  id: string;
  size: string;
  onClick: () => void;
  onChange: () => void;
  isChecked: boolean;
}

const Template: Story<CheckBoxProps> = (args) => <CheckBox {...args} />;

export const Basic = Template.bind({});

Basic.args = {};
