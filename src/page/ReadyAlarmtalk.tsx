import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { motion } from 'framer-motion';
import { Wrapper } from './Alarmtalk';
import axios from 'axios';
import { getCookie } from '../util/cookie';

function ReadyAlarmtalk() {
  const params = useParams();
  const token = getCookie('userToken');
  const location = useLocation();
  const [isTableData, setTableData] = useState([]);
  const fetchTemplateList = useCallback(async () => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/talk/clients/contents`,
          {
            groupId: params?.id,
            clientIds: location?.state.ArrClientsIdsData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setTableData(
            res.data.data.map((el: any) =>
              Object.assign(el.client, el.talkContent)
            )
          );
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchTemplateList();
  }, [fetchTemplateList]);

  console.log(isTableData);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>
        [전송] 클라이언트 알림톡 전송 내용 조회
        {isTableData.map((el: any) => el.clientId)}
      </Wrapper>
    </motion.div>
  );
}

export default ReadyAlarmtalk;
