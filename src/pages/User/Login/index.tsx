import { Footer } from '@/components';
import { login } from '@/services/ant-design-pro/api';
import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  SmileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Helmet, Link, history, useModel } from '@umijs/max';
import { Alert, Divider, Space, Tabs, message } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { SYSTEM_LOGO } from '@/constants';
import Settings from '../../../../config/defaultSettings';
import { ignore } from 'antd/es/theme/useToken';
import { postUserUserLogin } from '@/services/yuapi-backend/user';
import { loginUser } from '@/services/swagger/user';
// import { Divider } from 'rc-menu';
const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});
const ActionIcons = () => {
  const { styles } = useStyles();
  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
    </>
  );
};
const Lang = () => {
  const { styles } = useStyles();
  return;
};
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [userLoginState, setUserLoginState] = useState<API.UserSafetyResponse>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');
  const { styles } = useStyles();
  // const fetchUserInfo = async () => {
  //   const userInfo = await initialState?.fetchUserInfo?.();
  //   if (userInfo) {
  //     flushSync(() => {
  //       setInitialState((s) => ({
  //         ...s,
  //         currentUser: userInfo,
  //       }));
  //     });
  //   }
  // };
  // const handleSubmit = async (values: API.LoginParams) => {
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      // const res = await login({
      const res = await postUserUserLogin({
        ...values,
      });
      if (res.data) {
        
        setInitialState({
          loginUser: res.data
        });

        // Delay execution to ensure state is updated before checking it
        setTimeout(() => {
          console.log("here login res.data",res.data);
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          console.log("here login loginUser",initialState?.loginUser);
        }, 0);
        return;
      }
      




    //   if (res) {
    //     console.log("here res",res);

    //     // Assuming the token is in the response data
    //     //@ts-ignore
    //     const token = res.token;
    //     console.log("here token",token);
    //     // Store the token
    //     localStorage.setItem('jwtToken', token);

    //     const defaultLoginSuccessMessage = '登录成功！';
    //     message.success(defaultLoginSuccessMessage);
    //     await fetchUserInfo();
    //     const urlParams = new URL(window.location.href).searchParams;
    //     history.push(urlParams.get('redirect') || '/');
    //     return;
    //   }
    //   // console.log(res.data);
    //   // 如果失败去设置用户错误信息
    //   // setUserLoginState(res.data);
    //   setUserLoginState(res);
    } catch (error) {
      const defaultLoginFailureMessage = 'Login Failed, Pls Try Again.'//'登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }

  };
  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {'Login'}- {Settings.title}
        </title>
      </Helmet>
      
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<SmileOutlined style={{ fontSize: '44px' }} />}
          title="Koksheng API"
          subTitle={'Register, Share, and Track Your APIs'}
          initialValues={{
            autoLogin: true,
          }}
          // actions={['其他登录方式 :', <ActionIcons key="icons" />]}
          onFinish={async (values) => {
            // await handleSubmit(values as API.LoginParams);
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: 'Login'//'账户密码登录',
              },
              // {
              //   key: 'mobile',
              //   label: '手机号登录',
              // },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            // <LoginMessage content={'错误的账户和密码'} />
            <LoginMessage content={'Incorrect account or password'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'Please enter user account'}
                rules={[
                  {
                    required: true,
                    message: 'User account is required！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'Please enter password'}
                rules={[
                  {
                    required: true,
                    message: 'Password is required！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            {/* <Space split={<Divider type='vertical'/>}> */}
            <ProFormCheckbox noStyle name="autoLogin">
              Remember me
            </ProFormCheckbox>
            <Link style={{
                float: 'right',
              }} to='/user/register'>Don't have account? Create one</Link>
            {/* <a
              style={{
                float: 'right',
              }}
            >
              Forgot Password?
            </a> */}
            {/* </Space> */}
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
