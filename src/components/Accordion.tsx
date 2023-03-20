import React from 'react';
import styled from 'styled-components';
import DownArrow from '../asset/svg/DownArrow';
import UpArrow from '../asset/svg/UpArrow';

type Props = {
  title?: string | React.ReactNode;
  contents?: string | React.ReactNode;
};

function Accordion(props: Props) {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);
  const [isCollapse, setIsCollapse] = React.useState(false);

  const handleButtonClick = React.useCallback(
    (event: any) => {
      event.stopPropagation();
      if (parentRef.current === null || childRef.current === null) {
        return;
      }
      if (parentRef.current.clientHeight > 0) {
        parentRef.current.style.height = '0';
      } else {
        parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      }
      setIsCollapse(!isCollapse);
    },
    [isCollapse]
  );
  const parentRefHeight = parentRef.current?.style.height ?? '0px';
  const buttonText = parentRefHeight === '0px' ? <DownArrow /> : <UpArrow />;
  return (
    <Container>
      <Header onClick={handleButtonClick}>
        <div>{props.title}</div>
        {props.contents ? <div>{buttonText}</div> : <div />}
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  color: black;
  cursor: pointer;
  border-top: 1px solid #909090;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  height: 32px;
  color: #555;
  justify-content: space-between;
  margin: 10px 32px 10px 18px;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.35s ease;
`;

const Contents = styled.div``;
export default React.memo(Accordion);
