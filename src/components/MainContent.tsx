import styled from 'styled-components';
import React, { PropsWithChildren } from 'react';
import { DefaultTheme } from 'styled-components';

const ContentWrapper = styled.div`
  flex: 1;
  padding-right: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.colors?.background?.primary || '#1a1a1a'};
  color: ${({ theme }) => theme.colors?.text || '#ffffff'};
`;

const MainContent: React.FC<PropsWithChildren> = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default MainContent;
