import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import ClientHeader from '../components/ClientHeader';
import AlertModal from '../components/modal/AlertModal';

function SingleUserCreate() {
  // Modal 변수들

  // 성공 모달
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const clickSuccessModal = () => {
    setIsSuccessModal(true);
  };
  const closeSuccessModal = () => {
    setIsSuccessModal(false);
  };

  // 실패 모달
  const [isFailModal, setIsFailModal] = useState(false);
  const clickOpenModal = () => {
    setIsFailModal(true);
  };
  const closeModal = () => {
    setIsFailModal(false);
  };

  // input 기본 state
  const initialInput = {
    clientName: '',
    clientEmail: '',
    clientContact: '',
  };

  // input 상태변화값
  const [inputData, setInputData] = useState(initialInput);

  // input change 핸들러
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // submit 핸들러
  const submitHandler = async (e: any) => {
    e.preventDefault();

    // 연락처는 '-'제거 후 api 보내기
    const _contact = inputData.clientContact.replace(/-/g, '');

    // 빈칸 유효성 처리
    if (
      !(
        inputData.clientName === '' ||
        inputData.clientEmail === '' ||
        inputData.clientContact === ''
      )
    ) {
      //  이름, 이메일, 연락처 빈칸 없으면 등록
      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/clients`, {
        clientName: inputData.clientName,
        clientEmail: inputData.clientEmail,
        contact: _contact,
      });
      // 성공 모달
      clickSuccessModal();
    } else {
      // 실패 모달
      clickOpenModal();
    }
  };
  return (
    <Container>
      <ContentContainer>
        <FormContainer onSubmit={submitHandler}>
          <TableContainer>
            <tbody>
              <tr>
                <th>이름</th>
                <td>
                  <InputBox
                    name="clientName"
                    type="text"
                    value={inputData.clientName}
                    placeholder="성함"
                    onChange={onInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>
                  <InputBox
                    name="clientContact"
                    type="text"
                    value={inputData.clientContact}
                    placeholder="연락처"
                    onChange={onInputChange}
                  />
                </td>
              </tr>
              <tr>
                <th>이메일</th>
                <td>
                  <InputBox
                    name="clientEmail"
                    type="text"
                    value={inputData.clientEmail}
                    placeholder="이메일"
                    onChange={onInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </TableContainer>
        </FormContainer>
        <SubmitContatiner>
          <SubmitButton onClick={submitHandler}>등록</SubmitButton>
        </SubmitContatiner>
      </ContentContainer>
      {isSuccessModal && (
        <AlertModal closeModal={closeSuccessModal} content="등록 성공!" />
      )}
      {isFailModal && (
        <AlertModal closeModal={closeModal} content="빈칸을 확인해주세요." />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const ContentContainer = styled.div`
  height: 100%;
  margin: 100px 300px;
`;
const TableContainer = styled.table`
  height: auto;
  width: 100%;
  border: 2px solid #d8d8d8;

  th {
    height: 80px;
    vertical-align: middle;
    width: 20%;
    border: 2px solid #d8d8d8;
  }
  td {
    vertical-align: middle;
    width: 80%;
    border: 2px solid #d8d8d8;
  }
`;
const FormContainer = styled.form``;
const SubmitContatiner = styled.div`
  display: flex;
  justify-content: right;
  height: 10%;
  margin: 10px 0px 10px 10px;
`;
const SubmitButton = styled.button`
  width: 100px;
  background-color: blanchedalmond;
`;
const InputBox = styled.input`
  width: 500px;
  height: 40px;
`;

export default SingleUserCreate;
