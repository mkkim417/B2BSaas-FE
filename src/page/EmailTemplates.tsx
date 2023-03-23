import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EMAIL_TEMPLATE } from '../constants/emailTemplates';

function EmailTemplates() {
  const navigate = useNavigate();
  const TmpClickHandler = (id: number) => {
    navigate('/email', { state: { id } });
  };
  return (
    <Wrapper>
      <ContentsWrap>
        <H1>템플릿을 선택하세요</H1>
        <FlexWrap>
          {EMAIL_TEMPLATE.map((item, idx) => (
            <Contents key={idx} onClick={() => TmpClickHandler(idx)}>
              <img
                src={item.src}
                alt={`${item.id}`}
                style={{ width: '100%' }}
              />
            </Contents>
          ))}
        </FlexWrap>
      </ContentsWrap>
    </Wrapper>
  );
}

const ContentsWrap = styled.div`
  padding: 30px 80px;
`;
const FlexWrap = styled.div`
  width: 760px;
  margin: 30px auto;
`;
const Contents = styled.div`
  display: inline-block;
  width: 160px;
  margin-right: 30px;
  margin-bottom: 30px;
  border: 2px solid #ededed;
  cursor: pointer;
  /* &:nth-of-type(4n) {
    margin-right: inherit;
  } */
  &:hover {
    filter: drop-shadow(2px 4px 6px #ddd);
  }
`;
const H1 = styled.span`
  /* background: linear-gradient(to top, rgb(191, 255, 161) 1%, transparent 70%); */
  font-size: 30px;
  padding: 10px;
`;
const Wrapper = styled.div`
  padding-left: 250px;
`;
export default EmailTemplates;
