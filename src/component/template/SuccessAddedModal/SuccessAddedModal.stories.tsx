import { Meta, Story } from '@storybook/react';
import SuccessAddedModal from './SuccessAddedModal';

export default {
  title: 'ShoppingCart/SuccessAddedModal',
  component: SuccessAddedModal,
} as Meta;

interface SuccessAddedModalProps {
  productList: {
    id: string;
    name: string;
    img: string;
    price: string;
  }[];
  openModal: () => void;
  onClick: () => void;
}
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
};
