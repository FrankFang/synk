import styled from "styled-components";
export const Center = styled.div`
  display: flex;
  flex-direction: ${({ virtical }) => virtical ? 'column' : 'row'};
  justify-content: center;
  align-items: center;
`;
