import styled from 'styled-components';
import React, { PropsWithChildren } from 'react';
import { DefaultTheme } from 'styled-components';

interface ThemeProps {
  theme: DefaultTheme;
}

const ContentWrapper = styled.div<ThemeProps>`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text};
`;

const MainContent: React.FC<PropsWithChildren> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default MainContent; 