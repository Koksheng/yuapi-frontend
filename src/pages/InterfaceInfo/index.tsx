import { getInterfaceInfoGetInterfaceInfoById, postInterfaceInfoInvokeInterfaceInfo } from '@/services/yuapi-backend/interfaceInfo';
import { PageContainer } from '@ant-design/pro-components';
import { useMatch, useModel, useParams } from '@umijs/max';
import { Card, List, Skeleton, message, theme, Descriptions, Button, Form, Input, Spin, Divider } from 'antd';
import DescriptionsItem from 'antd/es/descriptions/Item';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { postUserInterfaceInfoGetFreeTrialUserInterfaceInfo } from '@/services/yuapi-backend/userInterfaceInfo';

/*
* 主页
*/
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfoSafetyResponse>();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);
  const params = useParams();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState;

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

  const onFinish = async (values: any) => {
    if(!params.id){
        message.error('Params not exists.');
        return;
    }
    setInvokeLoading(true);
    try{
        const res = await postInterfaceInfoInvokeInterfaceInfo({
            id: params.id,
            ...values,
        });
        // console.log("res",res);
        if(res.code == 0){
            setInvokeRes(res.data);
            message.success("Invoke successfully");
        }
        else{
            setInvokeRes("Invoke failed. " + res.message);
            message.error("Invoke failed. " + res.message);
        }
        
    } catch(error: any){
        message.error('Invoke failed, please try again'+ error.response.data.title);
    }
    setInvokeLoading(false);
    loadData();
  };

  const getFreeInterface = async () => {
    setInvokeLoading(true);
    try {
        // console.log("loginUser.id",loginUser.id);
        // console.log("data?.id",data?.id);
        const res = await postUserInterfaceInfoGetFreeTrialUserInterfaceInfo({
            userId: loginUser.id,
            interfaceInfoId: data?.id,
            lockNum: 5,
        });
        if (res.data) {
            message.success('Get Free Trial successfully.');
        } else {
            message.error('Failed to get Free Trial, please try again.');
        }
    } catch (e:any) {
      message.error('Request Failed, ' + e.message);
    }
    setInvokeLoading(false);
    loadData();
    return
  };

  return (
    <PageContainer title="View Interface Info">
        <Card>
            {data ? (
                <Descriptions title={data.name} column={1} extra={
                      <Button onClick={getFreeInterface}>Free Trial</Button>
                  }>
                    <DescriptionsItem label="Status">{data.status ? 'On' : 'Off'}</DescriptionsItem>
                    <DescriptionsItem label="Description">{data.description}</DescriptionsItem>
                    <Descriptions.Item label="Remaining invoke times">{data.userInterfaceInfoRemainingCount}</Descriptions.Item>
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
        <Divider></Divider>
        <Card title="Test Now">
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
        <Divider></Divider>
        <Card title="Test Result" loading={invokeLoading}>
            {invokeRes}
        </Card>
    </PageContainer>
  );
};

export default Index;
