import { Container, ButtonContainer } from './NavBar.styles';

interface NavBarProps {
  Logo: React.ReactNode;
  Buttons: React.ReactNode;
}
const NavBar = ({ Logo, Buttons }: NavBarProps) => (
  <Container>
    {Logo}
    <ButtonContainer>{Buttons}</ButtonContainer>
  </Container>
);

export default NavBar;
