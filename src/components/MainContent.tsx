import styled from 'styled-components';
import React, { PropsWithChildren } from 'react';
import { DefaultTheme } from 'styled-components';

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors?.background?.primary || '#ffffff'};
  color: ${({ theme }) => theme.colors?.text || '#000000'};
`;

const MainContent: React.FC<PropsWithChildren> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default MainContent; 