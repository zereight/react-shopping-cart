import { Meta, Story } from '@storybook/react';
import SuccessAddedModal, { SuccessAddedModalProps } from './SuccessAddedModal';

export default {
  title: 'ShoppingCart/SuccessAddedModal',
  component: SuccessAddedModal,
} as Meta;

const Template: Story<SuccessAddedModalProps> = ({ ...args }) => (
  <SuccessAddedModal {...args} />
);

export const Basic = Template.bind({});

Basic.args = {
  productList: [
    {
      id: '1',
      name: 'name1',
      img: '',
      price: '123원',
    },
    {
      id: '1',
      name: 'name1',
      img: '',
      price: '123원',
    },
    {
      id: '1',
      name: 'name1',
      img: '',
      price: '123원',
    },
  ],
  openModal: () => {},
  onClick: () => {},
};
