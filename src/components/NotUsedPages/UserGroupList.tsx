import axios from 'axios';
import { off } from 'process';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function UserGroupList() {
  const navigate = useNavigate();

  // modal hook

  // 그룹리스트 api 담는 상태변수
  const [groupList, setGroupList] = useState([] as any);

  // 개별 항목을 체크했을 때의 state
  const [isCheckingBox, setIsCheckingBox] = useState(false);

  // 검색바 필요 state
  const [copy, setCopy] = useState([] as any);
  const [searchTerm, setSearchTerm] = useState('');
  const [monsters, setMonsters] = useState([] as any);

  // 체크항목 저장하는 변수 state
  const [checkedArr, setCheckedArr] = useState<String[]>([]);

  // 개별 체크표시 핸들러
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>, id: any) => {
    setIsCheckingBox(!isCheckingBox);
    checkedItemHandler(e.target.checked, id);
  };
  // 전체 체크박스 선택 핸들러
  const allCheckHandler = (isChecked: boolean) => {
    const idArray = [] as any;
    if (isChecked) {
      groupList.forEach((item: any) => {
        if (idArray.includes(item.groupId)) {
          // check 배열에 전체선택 품목 중 포함되어있는 것이 있다면 빼고 push
        } else {
          // checkedArr.push(el.id);
          idArray.push(item.groupId);
          setCheckedArr(idArray);
        }
      });
    } else {
      setCheckedArr([]);
    }
  };

  // 체크아이템 변수에 담는 핸들러
  const checkedItemHandler = (isChecked: any, id: any) => {
    if (isChecked) {
      // 배열 추가 -> 객체 추가면 checkedArr.add
      checkedArr.push(id);
      setCheckedArr(checkedArr);
      // setCheckedArr([...checkedArr, id])
    } else if (!isChecked || checkedArr.includes(id)) {
      setCheckedArr((checkedArr) => checkedArr.filter((item) => item !== id));
    }
  };
  //yarn json-server --watch grouplist.json --port 4000

  const getGroupData = useCallback(async () => {
    const response = await axios.get(
      'https://dev.sendingo-be.store/api/groups'
    );
    setGroupList(response.data.data);
    setMonsters(response.data.data);
    setCopy(response.data.data);
  }, []);

  useEffect(() => {
    // 페이지 렌더링시 우선 데이터 받아오기
    getGroupData();
  }, [getGroupData]);

  useEffect(() => {
    setGroupList(
      // 조건 검색 여기서 설정 => 현재는 그룹명만 설정
      monsters.filter((item: any) =>
        item.groupName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Input search handler
  const inputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // 메세지 보내기 button handler
  const messageSendHandler = () => {
    // 체크박스 1개일 경우에만 메세지 보내기로 이동. 다수 선택 시 한개만 선택해달라고 안내
    if (checkedArr.length === 1) {
      alert('해당 그룹의 메세지보내기 페이지로 이동됩니다.');
    } else if (checkedArr.length === 0) {
      alert('한 개의 그룹리스트를 선택해주세요.');
    } else {
      alert('2개 이상의 그룹리스트를 선택하셨습니다. 한 개만 선택해주세요.');
    }
  };
  // 전체 삭제 button handler
  const groupDeleteHandler = () => {
    if (checkedArr.length === groupList.length) {
      // 그룹을 전체 선택하였을 경우 실행
      if (window.confirm('그룹을 전체삭제하시겠습니까?')) {
        alert('삭제가 완료되었습니다.');
        // api 삭제 통신
        // const deleteUserData = async () => {
        //   const response  = await axios.delete('http://localhost:4000/grouplist')
        //   console.log(groupList)
        // }
      } else {
        // anything
      }
    } else {
      alert('해당그룹을 모두 체크해주세요.');
    }
  };
  // 선택 삭제 button handler
  const individualDeleteHandler = () => {
    // 선택 삭제하기 전 한번 더 cofirm창
    if (window.confirm('해당 그룹들을 삭제하시겠습니까?')) {
      // 확인을 눌렀을 때
      alert('삭제가 완료되었습니다.');
      // const urls = checkedArr.map((groupId) => `http://localhost:4000/grouplist/${groupId}`)
      // console.log(urls)
      // axios.all(urls.map(url => axios.delete(url)))
      //   .then(response => {
      //     console.log(response)
      //     alert('삭제가 완료되었습니다')
      //   }).catch(error => {
      //     console.log(error.response)
      //     alert('삭제를 실패하였습니다.')
      //   })
    } else {
      // confirm창에서 취소를 눌렀을 때 아무일도 발생하지 않는다.
    }
  };

  // 특정 그룹리스트 클릭시 그룹리스트 내 유저리스트 볼 수 있는 페이지로 이동
  const moveInUserList = (id: any) => {
    alert(`해당 그룹 id:${id}의 유저리스트 페이지로 이동`);
    navigate(`/groupinuserlist/${id}`);
  };

  return (
    <Wrapper>
      <HeaderBar>
        <div>유저 그룹 리스트</div>
        <div>체크 갯수 : {checkedArr.length}</div>
        <input placeholder="검색" onChange={inputChange} />
        <Button onClick={messageSendHandler}>그룹생성</Button>
        <Button onClick={messageSendHandler}>메세지 보내기</Button>
        <Button onClick={individualDeleteHandler}> 선택 삭제 </Button>
        <Button onClick={groupDeleteHandler}> 전체 삭제 </Button>
      </HeaderBar>
      <CardHeader>
        <Percentage width="10%">
          전체선택
          <input
            type="checkbox"
            onChange={(e: any) => allCheckHandler(e.target.checked)}
            checked={checkedArr.length === groupList.length ? true : false}
          />
        </Percentage>
        <Percentage width="20%">생성일</Percentage>
        <Percentage width="50%">그룹명</Percentage>
        <Percentage width="20%">유저수</Percentage>
      </CardHeader>
      <ContentContainer>
        <CardContainer>
          {groupList?.map((item: any) => {
            return (
              <CardInBox key={item.groupId}>
                <Percentage width="10%">
                  <input
                    type="checkbox"
                    checked={checkedArr.includes(item.groupId)}
                    onChange={(e: any) => checkHandler(e, item.groupId)}
                  />
                </Percentage>
                <Percentage
                  width="20%"
                  onClick={() => moveInUserList(item.groupId)}
                >
                  {item.createdAt}
                </Percentage>
                <Percentage
                  width="50%"
                  onClick={() => moveInUserList(item.groupName)}
                >
                  {item.groupName}
                </Percentage>
                <Percentage
                  width="20%"
                  onClick={() => moveInUserList(item.groupId)}
                >
                  {/* {item.customerlist.length} */}
                </Percentage>
              </CardInBox>
            );
          })}
        </CardContainer>
      </ContentContainer>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  /* justify-content: center; */
  height: 100vh;
  padding-top: 70px;
  padding-left: 200px;
  /* gap: 30px; */
  background-color: yellow;
`;
export const HeaderBar = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  margin: 50px;
  background-color: aqua;
`;
export const ContentContainer = styled.div`
  height: 60%;
  background-color: bisque;
  margin: 0px 50px 50px 50px;
  overflow: scroll;
`;
export const CardContainer = styled.div`
  width: 100%;
  background-color: aqua;
  display: flex;
  flex-direction: column;
`;
export const CardInBox = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: pink;
  margin-bottom: 20px;
  :hover {
    background-color: greenyellow;
    cursor: pointer;
  }
`;
export const CardHeader = styled.div`
  /* width: 100%; */
  height: 60px;
  margin: 0px 50px 0px 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: deeppink;
  margin-bottom: 20px;
`;

export const Percentage = styled.div<{ width: any }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: any) => props.width};
`;
export const Button = styled.button`
  background-color: pink;
  padding: 10px;
`;
export default UserGroupList;
