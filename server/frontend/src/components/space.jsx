import styled from "styled-components"
export const Space = styled.div`
  height: ${({ x2, x3 }) => x2 ? 16 * 2 : x3 ? 16 * 3 : 16}px;
`