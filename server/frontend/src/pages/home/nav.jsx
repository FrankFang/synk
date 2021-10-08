import { NavLink } from "react-router-dom";
import styled from "styled-components";
const Nav = styled.nav`
  text-align: center;
  > ul {
    display: flex; border-top: 1px solid #333; border-left: 1px solid #333;
    > li { flex-grow: 1; border-right: 1px solid #333; border-bottom: 1px solid #333;
      > a { display: block; padding: 8px 0; 
        &.selected{ background: #f5b70d; }
      }
    }
  } 
`;
export const nav = (
  <Nav>
    <ul>
      <li>
        <NavLink to="/message" activeClassName="selected">
          传消息
        </NavLink>
      </li>
      <li>
        <NavLink to="/file" activeClassName="selected">
          传文件
        </NavLink>
      </li>
      <li>
        <NavLink to="/screenshot" activeClassName="selected">
          传截图
        </NavLink>
      </li>
    </ul>
  </Nav>
);
