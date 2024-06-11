import { getInterfaceInfoListInterfaceInfoByPageListPage } from '@/services/yuapi-backend/interfaceInfo';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card, List, Skeleton, message, theme } from 'antd';
import React, { useEffect, useState } from 'react';

/*
* 主页
*/
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfoSafetyResponse[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try{
        const res = await getInterfaceInfoListInterfaceInfoByPageListPage({
            current: any, pageSize
        });
        setList(res?.data?.items ?? []);
        setTotal(res?.data?.totalCount ?? 0);
    } catch(error: any){
        message.error('Load data failed, please try again'+ error.response.data.title);
    }
    setLoading(false);
  }

  useEffect(()=>{
    loadData();
  },[])

  return (
    <PageContainer title="在线接口开放平台">
        <List
            className="my-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
                <List.Item
                    actions={[<a key="list-loadmore-edit">view</a>]}
                >
                    <List.Item.Meta
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
            pagination={
                {
                    pageSize: 10,

                }
            }
        />
    </PageContainer>
  );
};

export default Index;
