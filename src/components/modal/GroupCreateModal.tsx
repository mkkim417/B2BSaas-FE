import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import Pagination from 'react-js-pagination';
import styled from 'styled-components'
import { PaginationBox } from '../../page/UserList';

type Props = {
  title?: string;
  memo?: string;
  coin?: number | string;
  closeModal?: () => void;
};
const GroupCreateModal = ({ title, memo, coin, closeModal }: Props) => {

  // group input 변수들
  const initialData = {
    groupName : '',
    groupDescription : ''
  }
  const [ data, setData ] = useState(initialData);

  // 입력변화 상태값
  const onChangeHandler = (e:any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  
  // 유저리스트 데이터 state
  const [ userList, setUserList ] = useState([] as any)

  // 검색 조건 state
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ monsters, setMonsters ] = useState([] as any);

  // 유저리스트 get API
  const getUserData = useCallback( async () => {
    const response = await axios.get('http://localhost:4000/userList')
    setUserList(response.data)
    setMonsters(response.data)
  }, [])

  // Pagination 처리
  const [ currentPage, setCurrentPage ] = useState(1);  // 현재 페이지 default값으로
  const [ count, setCount ] = useState(0) // 아이템 총 갯수
  // const [ product, setProduct ] = useState([])  // 리스트에 담아낼 아이템들
  const [ postPerPage ] = useState(10) // 한 페이지에 보여질 아이템 수
  const [ indexOfLastPost, setIndexOfLastPost ] = useState(0) // 현재 페이지의 마지막 아이템 인덱스
  const [ indexOfFirstPost, setIndexOfFirstPost ] = useState(0) // 현재 페이지의 첫번째 아이템 인덱스
  const [ currentPosts, setCurrentPosts ] = useState(0) // 현재 페이지에서 보여지는 아이템들
  // const userData = userList.slice(indexOfFirstPost, indexOfLastPost)
  const setPage = (error : any) => {
    setCurrentPage(error)
  }

  // 체크박스 관련 state

  // 개별 항목을 체크했을 때의 state
  const [ isCheckingBox, setIsCheckingBox ] = useState(false)
    // 체크항목 저장하는 변수 state
    const [ checkedArr, setCheckedArr ] = useState<String[]>([])
  // 개별 체크표시 핸들러
  const checkHandler  = (e:React.ChangeEvent<HTMLInputElement>, id:any) => {
    console.log('타켓 checked값 : ', e.target.checked, '타켓 Id값 :', id)
    setIsCheckingBox(!isCheckingBox)
    checkedItemHandler(e.target.checked, id)
    console.log('개별체크표시핸들러의 Id값확인', id)
  }

  // 전체 체크박스 선택 핸들러
  const allCheckHandler = ( isChecked : boolean) => {
    if(isChecked) {
      userList.map((el:any) => 
      {
        if (checkedArr.includes(el.id)) {
          // check 배열에 전체선택 품목 중 포함되어있는 것이 있다면 빼고 push 
        }else {
          checkedArr.push(el.id)
          setCheckedArr(checkedArr)
        }
      })
    } else {
      setCheckedArr([])
    }
  }

  // 체크아이템 변수에 담는 핸들러
  const checkedItemHandler = (isChecked : any, id : any) => {
    if(isChecked) {
      // 배열 추가 -> 객체 추가면 checkedArr.add
      checkedArr.push(id);
      setCheckedArr(checkedArr);
      // setCheckedArr([...checkedArr, id])
    } else if ( !isChecked || checkedArr.includes(id)) {
      setCheckedArr( checkedArr => checkedArr.filter((item) => item !== id))
    }
    console.log('checkedList', checkedArr)
  }

  // 페이지 렌더링하자마자 데이터 get
  useEffect(() => {
    getUserData();

    setCount(userList.length)
    setIndexOfLastPost(currentPage * postPerPage)
    setIndexOfFirstPost(indexOfLastPost - postPerPage)
    setCurrentPosts(userList.slice(indexOfFirstPost, indexOfLastPost))
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postPerPage, getUserData])
  
  // submit button handler
  const submitHandler = async (e:any, closeModal : any) => {
    alert(`groupName : ${data.groupName}, groupDes : ${data.groupDescription}`)
    // e.preventDefault();
    // alert('저장!')
    if (!(data.groupName === "")) {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/api/groups`, data)

      alert('저장 성공!')
      closeModal()
    } else {
      alert('그룹명을 입력해주세요.')
    }
  }

  // 검색필터 useEffect
  useEffect(() => {
    // 필터 bar 
    setUserList(
      // 조건 검색 여기서 설정
      monsters.filter(
        (item : any) => 
          item.id.includes(searchTerm) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.phone.includes(searchTerm) ||
          item.createDt.includes(searchTerm)
      )
    )
  }, [searchTerm])

  // Input search handler
  const inputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };
  return (
    <ModalWrap>
      <ModalBackGround/>
      <ModalContainer>
        <ContentContainer>
          <ContentHeader>
            <LineContainer height="25%" position="center" bc="orange">
              {title}
            </LineContainer>
            <LineContainer height="25%" position="center" bc="purple">
              그룹명 : <input
                name="groupName"
                type="text"
                value={data.groupName}
                placeholder='그룹명'
                onChange={onChangeHandler}/>
            </LineContainer>
            <LineContainer height="25%" position="center" bc="green">
              그룹설명 : <input 
                name="groupDescription"
                type="text"
                value={data.groupDescription}
                placeholder='그룹설명'
                onChange={onChangeHandler}/>
            </LineContainer>
            <LineContainer height="25%" position="end" bc="skyblue">
               예정 등록인원 : {checkedArr.length} 명
              <input placeholder='검색' onChange={inputChange}/>
            </LineContainer>
          </ContentHeader>
          {/* <ContentBody>
            <BodyHeader>
              <BodyHeaderPercentage width="15%">전체 체크
                <input 
                  type="checkbox" 
                  onChange={(e:any) => allCheckHandler(e.target.checked)}
                  checked={checkedArr.length === userList.length ? true : false}/>
              </BodyHeaderPercentage>
              <BodyHeaderPercentage width="25%">고객명</BodyHeaderPercentage>
              <BodyHeaderPercentage width="40%">연락처</BodyHeaderPercentage>
              <BodyHeaderPercentage width="20%">생성일</BodyHeaderPercentage>
            </BodyHeader>
            <BodyContent>
            {
              userList.slice(indexOfFirstPost, indexOfLastPost) && userList.length > 0? (
                userList.slice(indexOfFirstPost, indexOfLastPost).map((item :any) => {
                  return <CardInBox>
                <BodyPercentage width="15%">
                <input type="checkbox" checked={checkedArr.includes(item.id)} onChange={(e:any) => checkHandler(e, item.id)}/>
                </BodyPercentage>
                <BodyPercentage width="25%">{item.name}</BodyPercentage>
                <BodyPercentage width="40%">{item.phone}</BodyPercentage>
                <BodyPercentage width="20%">{item.createDt}</BodyPercentage>
                </CardInBox>
            })
          ) : (
            <div>No Post. </div>
          )
        }
            </BodyContent>
          </ContentBody> */}
        </ContentContainer>
        <PagingContainer>
          <PaginationBox>
            <Pagination 
            activePage={currentPage}
            itemsCountPerPage={5}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            totalItemsCount={userList.length}
            onChange={setPage}/>
          </PaginationBox>
        </PagingContainer>
        <ButtonContainer>
          <ButtonBox onClick={closeModal}>아니오</ButtonBox>
          <ButtonBox onClick={(e) => submitHandler(e, closeModal)}>네</ButtonBox>
        </ButtonContainer>
      </ModalContainer>
    </ModalWrap>
  );
};

// 전체 모달 감싸주는 컴포넌틑
const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
`;

// 모달 외의 뒷배경은 어둡게 처리
const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100vh;
  position: absolute; 
  bottom: 0;
  left: 0;
`;

// 모달 컴포넌트 페이지 CSS
const ModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  /* gap: 2rem; */
  padding: 2rem 2rem;
  border: 1px solid var(--color-white);
  background-color: white;
  position: absolute;
  left: 25%;
  top: -0%;
  width: 50%;
  height: 100%;
`;
const ContentContainer = styled.div`
  width: 100%;
  height: 90%;
  background-color: yellow;
  /* padding: 50px; */
`
const PagingContainer = styled.div`
  width: 100%;
  height: 5%;
  background-color: blueviolet;
`

// content header size
const ContentHeader = styled.div`
  width: 100%;
  height: 20%;
  background-color: burlywood;
`
// content body size
const ContentBody = styled.div`
  width: 100%;
  height: 85%;
  background-color: chocolate;
`
const CardInBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: pink;
  margin-bottom: 10px;
  text-align: center;
  :hover {
    background-color: greenyellow;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  background-color: antiquewhite;
  /* background-color: yellow; */
  /* padding: 50px; */
  /* margin: 50px; */
  gap: 100px;
`
const LineContainer = styled.div<{ height: any, position : any, bc : any }>`
  width: 100%;
  height: ${(props : any) => props.height };
  display: flex;
  justify-content: ${( props : any ) => props.position };
  background-color: ${( props : any) => props.bc};
`
const BodyHeader = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  flex-direction: row;
  background-color: fuchsia;
`
const BodyContent = styled.div`
  width: 100%;
  height: 93%;
  display: flex;
  flex-direction: column;
  background-color: honeydew;
`
const BodyHeaderPercentage = styled.div<{ width : any}>`
  width: ${(props : any) => props.width };
  /* height: 7%; */
  align-items: center;
  display: flex;
  justify-content: center;
  /* text-align: center; */

  border : 2px solid white;
`
const BodyPercentage = styled.div<{ width : any}>`
  width: ${(props : any) => props.width };
  /* height: 30px; */
  text-align: center;
  /* border : 2px solid white; */
`

const ButtonBox = styled.button`
  background-color: yellowgreen;
  /* padding: 10px; */
  font-size: 24px;
`

export default GroupCreateModal;