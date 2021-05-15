import { Meta, Story } from '@storybook/react';
import { MouseEvent } from 'react';
import Modal from './Modal';

export default {
  title: 'ShoppingCart/Modal',
  component: Modal,
  argTypes: { children: { control: 'text' } },
} as Meta;

interface ModalProps {
  children: React.ReactNode;
  onClickClose: (event: MouseEvent<HTMLDivElement>) => void;
}
const Template: Story<ModalProps> = ({ ...args }) => <Modal {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <>
      <span>상품이 장바구니에 담겼습니다.</span>
      <button type="button">{'장바구니 바로가기 >'}</button>
    </>
  ),
  onClickClose: () => alert('모달 닫기'),
};
