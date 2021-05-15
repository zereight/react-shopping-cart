import { Input, Label } from './CheckBox.styles';

interface CheckBoxProps {
  id: string;
  size: string;
  onClick: () => void;
  onChange: () => void;
  isChecked: boolean;
}

const CheckBox = ({
  id,
  size = "28px",
  onClick,
  onChange,
  isChecked=false,
}: CheckBoxProps) => (
  <>
    <Input
      id={id}
      type="checkbox"
      onClick={onClick}
      onChange={onChange}
      checked={isChecked}
    />
    <Label htmlFor={id} size={size} />
  </>
);

export default CheckBox;
