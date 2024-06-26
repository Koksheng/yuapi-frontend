import {
    Avatar,
    Button,
    Card,
    Descriptions,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Typography,
    Upload,
    UploadFile,
    UploadProps,
  } from 'antd';
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import moment from 'moment';
import { getUserGetKey, postUserUpdateUser, postUserRegenerateKey } from '@/services/yuapi-backend/user';
import { requestConfig } from '@/requestConfig';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
  
const { Option } = Select;
const { Paragraph } = Typography;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt3M;
};
  
const Index: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<API.UserDevKeyResponse>();
    const [updateModalShow, setUpdateModalShow] = useState<boolean>(false);
    const { initialState, setInitialState } = useModel('@@initialState');
    const { loginUser } = initialState || {};
    const [imageUrl, setImageUrl] =  useState<string | null>(loginUser?.userAvatar ? `${requestConfig.baseURL}/${loginUser.userAvatar}` : null);
    
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await getUserGetKey();
        // console.log(res);
        // console.log(res.data);
        setData(res.data);
      } catch (e: any) {
        message.error('获取数据失败，' + e.message);
      }
      setLoading(false);
      return;
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj as RcFile, (url) => {
          setLoading(false);
          setImageUrl(url);
        });
        location.reload();
      }
    };

    const genKey = async () => {
      try {
        const res = await postUserRegenerateKey();
        setData(res.data);
      } catch (e: any) {
        message.error('获取数据失败，' + e.message);
      }
    };

    const showDevKey = () => {
      loadData();
    };

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);
        console.log('Received values of form: loginUser', loginUser);
        
        try {
            const res = await postUserUpdateUser({
            ...values,
            id: loginUser?.id,
            userAvatar: loginUser?.userAvatar,
            userRole: loginUser?.userRole,
            isDelete: loginUser?.isDelete,
            });
            console.log('values: ', values);
            console.log('Res: ', res);
            if (res.code === 0 && res.data === 1) {
            message.success('Update Successfully');
            } else {
            message.error('Update failed, pls try again later！');
            }
            setUpdateModalShow(false);
            location.reload();
        } catch (error: any) {
            setUpdateModalShow(false);
            console.log('error: ', error);
            message.error('Configuration failed, '+ error.response.data.title);
            return false;
        }
    };

    return (
      <>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card
  
            title="Personal Info"
            actions={[
              <b key="gender">Gender: {loginUser?.gender == (0 ?? null) ? 'Male' : 'Female'}</b>,
              <b key="time">Create Time: {loginUser?.createTime ? moment(loginUser.createTime).format('YYYY-MM-DD HH:mm:ss') : null}</b>,
              <b key="role">Role: {loginUser?.userRole?? null === 'admin' ? 'Normal User' : 'Admin'}</b>,
            ]}
            extra={
              <Button type={'link'} onClick={() => setUpdateModalShow(true)}>
                Edit
              </Button>
            }
          >
            <Card.Meta
              avatar={
                <>
                  <Upload
                    name="file"
                    // listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    maxCount={1}
                    withCredentials={true}
                    action={requestConfig.baseURL + '/api/User/updateUserAvatar/update/avatar'}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <Avatar
                        size={{ xs: 30, sm: 40, md: 48, lg: 70, xl: 88, xxl: 100 }}
                        src={imageUrl}
                        icon={<UserOutlined />}
                      />
                    ) : (
                      <div>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload Avatar</div>
                      </div>
                    )}
                  </Upload>
                </>
              }
              title={loginUser?.userName?? null}
              description={'User Account: ' + loginUser?.userAccount?? null}
            />
          </Card>
          <Card
            title="Developer key (Keys for invoking the interface)"
            extra={
                <>
                <Space>
                    {/* <Button onClick={getSdk}>下载SDK</Button> */}
                    <Button onClick={showDevKey}>Show Key</Button>
                    <Button onClick={genKey}>Regenerate Key</Button>
                </Space>
                </>
            }
            >
            <Descriptions column={1} bordered size="small" layout="vertical">
                <Descriptions.Item label="accessKey">
                <Paragraph copyable={{ tooltips: false }}>
                    {data?.accessKey ?? '******************'}
                </Paragraph>
                </Descriptions.Item>
                <Descriptions.Item label="secretKey">
                <Paragraph copyable={{ tooltips: false }}>
                    {data?.secretKey ?? '******************'}
                </Paragraph>
                </Descriptions.Item>
            </Descriptions>
          </Card>
  
          
        </Space>
  
        <Modal
            title="Edit Personal Info"
            open={updateModalShow}
            confirmLoading={loading}
            footer={null}
            onCancel={() => setUpdateModalShow(false)}
        >
            <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{ 'input-number': 3, 'checkbox-group': ['A', 'B'], rate: 3.5 }}
            style={{ maxWidth: 600 }}
            >
            <Form.Item
                {...formItemLayout}
                name="userName"
                label="Username"
                initialValue={loginUser?.userName?? null}
                rules={[{ required: true, message: 'Please enter your username' }]}
            >
                <Input placeholder="Please enter your username" />
            </Form.Item>
            <Form.Item
                name="gender"
                label="Gender"
                hasFeedback
                initialValue={loginUser?.gender?? null}
                rules={[{ required: true, message: 'Please select your gender' }]}
            >
                <Select placeholder="Please select your gender">
                    <Option value={0}>Male</Option>
                    <Option value={1}>Female</Option>
                </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Space>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button htmlType="reset">Reset</Button>
                </Space>
            </Form.Item>
            </Form>
        </Modal>
      </>
    );
};
  
export default Index;
  