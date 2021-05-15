import styled from '@emotion/styled';

interface SvgProps {
  scale: string;
}

const SVG = styled.svg`
  transform: ${({ scale }: SvgProps) => `scale(${scale})`};
`;

export { SVG };
