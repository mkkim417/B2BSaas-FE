export const KorToEngTransData = {
  이메일: 'clientEmail',
  ID: 'clientId',
  이름: 'clientName',
  연락처: 'contact',
  생성일: 'createdAt',
  고객명: 'customerName',
  택배사: 'deliveryCompany',
  배송일: 'deliveryDate',
  송장번호: 'deliveryNumber',
  배송일자: 'deliveryTime',
  그룹ID: 'groupId',
  그룹이름: 'groupName',
  주문번호: 'orderNumber',
  회사명: 'organizationName',
  결제금액: 'paymentPrice',
  '구/면': 'region',
  '동/리': 'regionDetail',
  알림톡컨텐츠ID: 'talkContentId',
  템플릿ID: 'talkTemplateId',
} as any;
export const engToKorTransData = {
  clientEmail: '이메일',
  clientId: 'ID',
  clientName: '이름',
  contact: '연락처',
  createdAt: '생성일',
  customerName: '고객명',
  deliveryCompany: '택배사',
  deliveryDate: '배송일',
  deliveryNumber: '송장번호',
  deliveryTime: '배송일자',
  groupId: '그룹ID',
  groupName: '그룹이름',
  orderNumber: '주문번호',
  organizationName: '회사명',
  paymentPrice: '결제금액',
  region: '구/면',
  regionDetail: '동/리',
  talkContentId: '알림톡컨텐츠ID',
  talkTemplateId: '템플릿ID',
} as any;

export const ALAERMTALK_TEMPLATE = {
  '택배번호 안내': {
    id: 1,
    text: `<span id="#{고객명}">#{고객명데이터}</span> 고객님! <span id="#{택배회사명}">#{택배회사명데이터}</span>입니다.
    <span id="#{택배배송시간}">#{택배배송시간데이터}</span> 택배를 배달할 예정입니다.
    등기번호(운송장번호) : <span id="#{송장번호}">#{송장번호데이터}</span>`,
    reqData: ['#{고객명}', '#{택배회사명}', '#{택배배송시간}', '#{송장번호}'],
    tmpCode: 'TM_2216',
  },
  '주문완료 안내': {
    id: 2,
    text: `[<span id="#{회사명}">#{회사명}</span>] 주문완료안내
  □ 주문번호 : <span id="#{주문번호}">#{주문번호}</span>
  □ 배송지 : <span id="#{구/면}">#{구/면}</span> <span id="#{동/리}">#{동/리}</span>
  □ 배송예정일 : <span id="#{월일}">#{월일}</span>
  □ 결제금액 : <span id="#{결제금액}">#{결제금액}</span>원`,
    reqData: [
      '#{회사명}',
      '#{주문번호}',
      '#{구/면}',
      '#{동/리}',
      '#{월일}',
      '#{결제금액}',
    ],
    tmpCode: 'TM_2217',
  },
  // '사용법 안내': {
  //   id: 3,
  //   text: `<span id="#{고객명}">#{고객명}</span>고객님 우리 회사와 거래하여
  //   주셔서 감사합니다.
  //   구매하신 제품의 사용(이용)법을
  //   확인해 보세요.`,
  //   reqData: ['#{고객명}'],
  //   tmpCode: 'TM_2220',
  // },
  '배송완료 안내': {
    id: 4,
    text: `<span id="#{고객명}">#{고객명}</span>님께서 주문하신 물품이
    배송완료 되었습니다.
    구매확정 부탁드립니다.`,
    reqData: ['#{고객명}'],
    tmpCode: 'TM_2222',
  },
  '회원가입완료 안내': {
    id: 5,
    text: `안녕하세요. <span id="#{고객명}">#{고객명}</span>님!
    <span id="#{회사명}">#{회사명}</span>
    에 회원가입 해주셔서
    진심으로 감사드립니다~`,
    reqData: ['#{고객명}', '#{회사명}'],
    tmpCode: 'TM_2223',
  },
};
