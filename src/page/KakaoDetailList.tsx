import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

function KakaoDetailList() {
  let params = useParams();
  console.log(params);

  const KakaoDetail = useCallback(async () => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/talk/results/detail/${params.id}`
      )
      .then((res) => {
        console.log(res.data);
      });
  }, [params.id]);
  useEffect(() => {
    KakaoDetail();
  }, [KakaoDetail]);
  return <div>KakaoDetailList</div>;
}

export default KakaoDetailList;
