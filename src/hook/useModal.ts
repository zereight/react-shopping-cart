import { MouseEvent, useState } from 'react';

const useModal = (defaultValue: any) => {
  const [isModalOpen, setModalState] = useState(defaultValue);

  const onClickClose = (event: MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement;
    const currentTarget = event.currentTarget as HTMLDivElement;

    if (target !== currentTarget) return;

    setModalState(false);
  };

  const open = () => {
    setModalState(true);
  };

  const close = () => {
    setModalState(false);
  };

  const toggle = () => {
    setModalState((state: any) => !state);
  };

  return {
    isModalOpen,
    setModalState,
    onClickClose,
    open,
    close,
    toggle,
  };
};

export default useModal;
