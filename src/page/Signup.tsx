import React from 'react';
import { Wrapper } from './Home';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

function Signup() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StEmail>
        <p>이메일</p>
        <Stinput type="text" name="Email" />
        <button>중복확인</button>
      </StEmail>
      <StBrand>
        <h1>소속명</h1>
        <StBrandinput
          type="text"
          name="BrandName"
          placeholder="브랜드(기업)명을 입력하세요"
        />
        <button>중복확인</button>
        <StBrandInfo>
          <StBrandInputWrapper>
            <h1>담당자 이름</h1>
            <StBrandinput
              type="text"
              name="PicName"
              placeholder="담당자를 입력하세요"
            />
          </StBrandInputWrapper>
          <StBrandInputWrapper>
            <h1>담당자 전화번호</h1>
            <StBrandinput
              type="text"
              name="ContactNumber"
              placeholder="담당자 전화번호"
            />
          </StBrandInputWrapper>
        </StBrandInfo>
      </StBrand>
      <StPw>
        <h1>비밀번호</h1>
        <StPwinput
          type="text"
          name="Password"
          placeholder="영문, 숫자 포함 총 8자리"
        />
        <h1>비밀번호 확인</h1>
        <StPwinput
          type="text"
          name="ConfirmPw"
          placeholder="영문, 숫자 포함 총 8자리"
        />
      </StPw>
      <StSignupButton onClick={() => navigate('/login')}>
        회원가입
      </StSignupButton>
    </Wrapper>
  );
}

export default Signup;

const StEmail = styled.div`
  border: 2px solid;
`;

const Stinput = styled.input`
  background: rgba(170, 170, 170, 0.26);
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
`;

const StBrand = styled.div`
  border: 2px solid;
  text-align: center;
  width: 600px;
`;

const StBrandinput = styled.input`
  background: #d3d3d3;
  border-radius: 40px;
  margin-right: 20px;
`;

const StBrandInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const StBrandInputWrapper = styled.div`
  margin: 10px;
`;

const StPw = styled.div`
  border: 2px solid;
`;

const StPwinput = styled.input`
  background: #d3d3d3;
  border-radius: 40px;
  width: 400px;
  margin: 10px auto;
`;

const StSignupButton = styled.button`
  background: #d3d3d3;
  border-radius: 40px;
  width: 100px;
  height: 50px;
`;
