import { getInterfaceInfoGetInterfaceInfoById, getInterfaceInfoListInterfaceInfoByPageListPage } from '@/services/yuapi-backend/interfaceInfo';
import { PageContainer } from '@ant-design/pro-components';
import { useMatch, useModel, useParams } from '@umijs/max';
import { Card, List, Skeleton, message, theme, Descriptions, Button, Form, Input } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

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
  },[]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <PageContainer title="View Interface Info">
        <Card>
            {data ? (
                <Descriptions title={data.name} column={1} extra={<Button>Invoke</Button>}>
                    <DescriptionsItem label="Status">{data.status ? 'On' : 'Off'}</DescriptionsItem>
                    <DescriptionsItem label="Description">{data.description}</DescriptionsItem>
                    <DescriptionsItem label="Url">{data.url}</DescriptionsItem>
                    <DescriptionsItem label="Method">{data.method}</DescriptionsItem>
                    <DescriptionsItem label="Request Param">{data.requestParams}</DescriptionsItem>
                    <DescriptionsItem label="Request Header">{data.requestHeader}</DescriptionsItem>
                    <DescriptionsItem label="Response Header">{data.responseHeader}</DescriptionsItem>
                    <DescriptionsItem label="Create Time">{moment(data.createTime).format('YYYY-MM-DD HH:mm:ss')}</DescriptionsItem>
                    <DescriptionsItem label="Update Time">{moment(data.updateTime).format('YYYY-MM-DD HH:mm:ss')}</DescriptionsItem>
                </Descriptions>
            ) : ( 
                <>Interface Not Exists.</>
            )}
        </Card>
        <Card>
            <Form
                name="invoke"
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item
                    label="Request Param"
                    name="userrequestParams"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </PageContainer>
  );
};

export default Index;
