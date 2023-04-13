export const KorToEngTransData = {
  이메일: 'clientEmail',
  ID: 'clientId',
  이름: 'clientName',
  연락처: 'contact',
  생성일: 'createdAt',
  고객명: 'customerName',
  택배회사명: 'deliveryCompany',
  월일: 'deliveryDate',
  송장번호: 'deliveryNumber',
  택배배송시간: 'deliveryTime',
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
  deliveryCompany: '택배회사명',
  deliveryDate: '월일',
  deliveryNumber: '송장번호',
  deliveryTime: '택배배송시간',
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

export const ALAERMTALK_TEMPLATE = [
  [
    {
      talkTemplateId: 2,
      talkTemplateCode: 'TM_2216',
      talkTemplateName: '택배번호 안내',
      talkTemplateContent:
        '#{고객명} 고객님! #{택배회사명}입니다.\n\n#{택배배송시간} 택배를 배달할 예정입니다.\n\n등기번호(운송장번호) : #{송장번호}',
      text: '<span id="#{고객명}">#{고객명데이터}</span> 고객님! <span id="#{택배회사명}">#{택배회사명데이터}</span>입니다.\n<span id="#{택배배송시간}">#{택배배송시간데이터}</span> 택배를 배달할 예정입니다.\n등기번호(운송장번호) : <span id="#{송장번호}">#{송장번호데이터}</span>',
      reqData:
        '["#{고객명}", "#{택배회사명}", "#{택배배송시간}", "#{송장번호}"]',
    },
    {
      talkTemplateId: 3,
      talkTemplateCode: 'TM_2217',
      talkTemplateName: '주문완료 안내',
      talkTemplateContent:
        '[#{회사명}] 주문완료안내\n\n□ 주문번호 : #{주문번호}\n\n□ 배송지 : #{구/면} #{동/리}\n\n□ 배송예정일 : #{월일}\n\n□ 결제금액 : #{결제금액}원',
      text: '[<span id="#{회사명}">#{회사명}</span>] 주문완료안내\n□ 주문번호 : <span id="#{주문번호}">#{주문번호}</span>\n□ 배송지 : <span id="#{구/면}">#{구/면}</span> <span id="#{동/리}">#{동/리}</span>\n□ 배송예정일 : <span id="#{월일}">#{월일}</span>\n□ 결제금액 : <span id="#{결제금액}">#{결제금액}</span>원',
      reqData:
        '["#{회사명}","#{주문번호}","#{구/면}","#{동/리}","#{월일}","#{결제금액}"]',
    },
    {
      talkTemplateId: 5,
      talkTemplateCode: 'TM_2222',
      talkTemplateName: '배송완료 안내',
      talkTemplateContent:
        '#{고객명}님께서 주문하신 물품이 배송완료 되었습니다. \n\n구매확정 부탁드립니다.',
      text: '<span id="#{고객명}">#{고객명}</span>님께서 주문하신 물품이 배송완료 되었습니다.\n    구매확정 부탁드립니다.',
      reqData: '["#{고객명}"]',
    },
    {
      talkTemplateId: 6,
      talkTemplateCode: 'TM_2223',
      talkTemplateName: '회원가입완료 안내',
      talkTemplateContent:
        '안녕하세요. #{고객명}님!\n\n#{회사명} \n        \n#{회사명}에 회원가입 해주셔서 진심으로 감사드립니다~',
      text: '안녕하세요. <span id="#{고객명}">#{고객명}</span>님!\n    <span id="#{회사명}">#{회사명}</span>에 회원가입 해주셔서 진심으로 감사드립니다~',
      reqData: '["#{고객명}", "#{회사명}"]',
    },
    {
      talkTemplateId: 7,
      talkTemplateCode: 'TM_2220',
      talkTemplateName: '사용법 안내',
      talkTemplateContent:
        '#{고객명}고객님 우리 회사와 거래하여\n 주셔서 감사합니다.\n구매하신 제품의 사용(이용)법을\n확인해 보세요.',
      text: '<span id="#{고객명}">#{고객명}</span>고객님!\n    우리 회사와 거래하여\n 주셔서 감사합니다.\n구매하신 제품의 사용(이용)법을\n확인해 보세요. <button style="border: 1px solid #ecedee;background: #f6f7f8;width: 100%;font-size: 14px;margin-top: 30px;padding: 7px;border-radius: 7px;">사용법 바로가기</button>',
      reqData: '["#{고객명}"]',
    },
  ],
];
