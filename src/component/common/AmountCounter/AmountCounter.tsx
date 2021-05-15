
import {
  Container,
  Input,
  Nav,
  ArrowContainer,
  ArrowUp,
  ArrowDown,
} from './AmountCounter.styles';

interface AmountCounterProps {
  min?: number;
  max?: number;
  onChange?: () => void;
  value: number;
  onClickUp: () => void;
  onClickDown: () => void;
}

const AmountCounter = ({
  min = 1,
  max = 20,
  onChange = () => {},
  value,
  onClickUp,
  onClickDown,
}: AmountCounterProps) => (
  <Container>
    <Input
      type="number"
      min={min}
      max={max}
      onChange={onChange}
      value={value}
    />
    <Nav>
      <ArrowContainer onClick={onClickUp}>
        <ArrowUp />
      </ArrowContainer>
      <ArrowContainer onClick={onClickDown}>
        <ArrowDown />
      </ArrowContainer>
    </Nav>
  </Container>
);

export default AmountCounter;
