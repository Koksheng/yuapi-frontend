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

  const loadData = async (current = 1, pageSize = 5) => {
    setLoading(true);
    try{
        const res = await getInterfaceInfoListInterfaceInfoByPageListPage({
            current, pageSize
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
    <PageContainer title="Online Interface Info">
        <List
            className="my-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => 
                {
                    const apiLink = `/interface_info/${item.id}`;
                    return (
                        <List.Item
                            actions={[<a key={item.id} href={apiLink}>view</a>]}
                        >
                            <List.Item.Meta
                                title={<a href={apiLink}>{item.name}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    );
                }
            }
            pagination={
                {
                    showTotal(total: number){
                        return 'Total: ' + total;
                    },
                    pageSize: 5,
                    total,
                    onChange(page, pageSize){
                        loadData(page, pageSize);
                    }
                }
            }
        />
    </PageContainer>
  );
};

export default Index;
