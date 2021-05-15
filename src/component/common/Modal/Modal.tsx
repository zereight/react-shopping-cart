import React, { MouseEvent } from 'react';
import CloseIcon from '../svg/CloseIcon/CloseIcon';
import { Dimmer, Container, CloseButton } from './Modal.styles';

interface ModalProps {
  children: React.ReactNode;
  onClickClose: (event: MouseEvent<HTMLDivElement>) => void;
}
const Modal = ({ children, onClickClose }: ModalProps) => (
  <Dimmer
    onClick={(event: MouseEvent<HTMLDivElement>) =>
      onClickClose(event)
    }
  >
    <Container>
      <CloseButton
        onClick={(event: MouseEvent<HTMLDivElement>) =>
          onClickClose(event)
        }
      >
        <CloseIcon scale="1.0" />
      </CloseButton>
      {children}
    </Container>
  </Dimmer>
);

export default Modal;
