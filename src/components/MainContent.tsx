import styled from 'styled-components';
import React from 'react';

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text};
`;

const MainContent: React.FC = ({ children }) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default MainContent; 