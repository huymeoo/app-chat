import styled from "styled-components";
import { Layout, Col } from "antd";

export const LayoutA = styled(Layout)`
  background-color: ${({ theme }) => theme.colors.bg};
`;

export const Col1 = styled(Col)`
  background-color: #1890ff;
  .room {
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(240, 242, 245, 1) 100%
    );
    padding: 15px 10px;
  }
  .room:hover {
    background-color: white;
    padding: 15px 10px;
  }
  .room p {
    margin: 0;
  }
  .Search {
    padding: 10px;
    box-sizing: border-box;
  }
`;
