import axios from 'axios';

export const clentBulkFetch = async (isData: any) => {
  let data = [] as any;
  isData.map((el: any) =>
    data.push({
      clientName: `${el.이름}`,
      contact: `${el.전화번호.replace(/-/gi, '')}`,
      clientEmail: `${el.이메일}`,
    })
  );
  try {
    const response = await axios
      .post(`https://dev.sendingo-be.store/api/clients/bulk`, { data })
      .then((res) => {
        console.log('api/clients/bulk : ', res.data.newClients);
      });
    return response;
  } catch (error) {
    console.log(error);
    alert('다시 시도해주시기 바랍니다.');
  }
};
