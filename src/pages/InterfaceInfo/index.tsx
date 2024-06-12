import { getInterfaceInfoGetInterfaceInfoById, getInterfaceInfoListInterfaceInfoByPageListPage } from '@/services/yuapi-backend/interfaceInfo';
import { PageContainer } from '@ant-design/pro-components';
import { useMatch, useModel, useParams } from '@umijs/max';
import { Card, List, Skeleton, message, theme, Descriptions } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import React, { useEffect, useState } from 'react';

/*
* 主页
*/
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoSafetyResponse>();
  const params = useParams();

  const loadData = async () => {
    if(!params.id){
        message.error('Params not exists.');
        return;
    }
    setLoading(true);
    try{
        const res = await getInterfaceInfoGetInterfaceInfoById({
            id: Number(params.id)
        });
        setData(res.data);
    } catch(error: any){
        message.error('Load data failed, please try again'+ error.response.data.title);
    }
    setLoading(false);
  }

  useEffect(()=>{
    loadData();
  },[])

  return (
    <PageContainer title="View Interface Info">
        <Card>
            {data ? (
                <Descriptions title={data.name} column={1}>
                    <DescriptionsItem label="Status">{data.status ? 'On' : 'Off'}</DescriptionsItem>
                    <DescriptionsItem label="Description">{data.description}</DescriptionsItem>
                    <DescriptionsItem label="Url">{data.url}</DescriptionsItem>
                    <DescriptionsItem label="Method">{data.method}</DescriptionsItem>
                    <DescriptionsItem label="Request Param">{data.requestParams}</DescriptionsItem>
                    <DescriptionsItem label="Request Header">{data.requestHeader}</DescriptionsItem>
                    <DescriptionsItem label="Response Header">{data.responseHeader}</DescriptionsItem>
                    <DescriptionsItem label="Create Time">{data.createTime}</DescriptionsItem>
                    <DescriptionsItem label="Update Time">{data.updateTime}</DescriptionsItem>
                </Descriptions>
            ) : ( 
                <>Interface Not Exists.</>
            )}
        </Card>
    </PageContainer>
  );
};

export default Index;
