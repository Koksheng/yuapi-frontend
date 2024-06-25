import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
// import type { FormValueType } from './components/UpdateForm';
// import UpdateForm from './components/UpdateForm';
import { getInterfaceInfoListInterfaceInfoByPageListPage, postInterfaceInfoAddInterfaceInfo, postInterfaceInfoDeleteInterfaceInfo, postInterfaceInfoUpdateInterfaceInfo } from '@/services/yuapi-backend/interfaceInfo';
import CreateModal from './components/CreateModal';
import UpdateModal from './components/UpdateModal';
import { postInterfaceInfoOnlineInterfaceInfo } from '@/services/yuapi-backend/interfaceInfo';
import { postInterfaceInfoOfflineInterfaceInfo } from '@/services/yuapi-backend/interfaceInfo';

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfoSafetyResponse>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfoSafetyResponse[]>([]);

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfoSafetyResponse) => {
    const hide = message.loading('正在添加');
    try {
      await postInterfaceInfoAddInterfaceInfo({
        ...fields,
      });
      hide();
      message.success('Added successfully');
      handleModalVisible(false);
      return true;
    } catch (error: any) {
      hide();
      console.log('handleAdd error catch',error);
      message.error('Adding failed, ' + error.response.data.title);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoSafetyResponse) => {
    if(!currentRow){
      return;
    }
    const hide = message.loading('Configuring');
    try {
      await postInterfaceInfoUpdateInterfaceInfo({
        id: currentRow.id,
        ...fields
      });
      hide();
      message.success('Configuration is successful');
      return true;
    } catch (error: any) {
      hide();
      message.error('Configuration failed, '+ error.response.data.title);
      return false;
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param record
   */
  const handleRemove = async (record: API.InterfaceInfoSafetyResponse) => {
    console.log("record",record);
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await postInterfaceInfoDeleteInterfaceInfo({
        id: record.id
      });
      hide();
      message.success('Deleted successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('Delete failed, please try again'+ error.response.data.title);
      return false;
    }
  };

  /**
   *  发布接口
   *
   * @param record
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('正在发布接口');
    if (!record) return true;
    try {
      await postInterfaceInfoOnlineInterfaceInfo({
        id: record.id
      });
      hide();
      message.success('Publish successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('Publish failed, please try again'+ error.response.data.title);
      return false;
    }
  };

  /**
   *  下线接口
   *
   * @param record
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('正在下线接口');
    if (!record) return true;
    try {
      await postInterfaceInfoOfflineInterfaceInfo({
        id: record.id
      });
      hide();
      message.success('Offline successfully and will refresh soon');
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('Offline failed, please try again'+ error.response.data.title);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfoSafetyResponse>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: 'Name', //'接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
        }]
      }
    },
    {
      title: 'Description', //描述
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: 'Method', //请求方法
      dataIndex: 'method',
      valueType: 'text',
    },
    {
      title: 'Url', //接口地址
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: 'Request Params', //请求参数
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
    },
    {
      title: 'Request Header', //请求头
      dataIndex: 'requestHeader',
      valueType: 'jsonCode',
    },
    {
      title: 'Response Header', //响应头
      dataIndex: 'responseHeader',
      valueType: 'jsonCode',
    },

    {
      title: 'Status', //状态
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: 'Off', //关闭
          status: 'Default',
        },
        1: {
          text: 'On', //开启
          status: 'Processing',
        },
      },
    },
    {
      title: 'Create Time', //创建时间
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'Update Time', //更新时间
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: 'Action', //操作
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          update
        </a>,
        record.status === 0 ? <a
          key="config"
          onClick={() => {
            handleOnline(record);
          }}
        >
          Online
        </a> : null,
        record.status === 1 ? <Button
          type="text"
          key="config"
          danger
          onClick={() => {
            handleOffline(record);
          }}
        >
          Offline
        </Button> : null,
        <Button
          type="text"
          key="config"
          danger
          onClick={() => {
            handleRemove(record);
          }}
        >
          Delete
        </Button>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        // headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> Create
          </Button>,
        ]}
        // request={async (params: API.PageParams & { pageSize?: number; current?: number }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>)=>{
        //   const res: any = await getInterfaceInfoListInterfaceInfoByPageListPage({
        //     ...params
        //   });
        //   if(res?.data){
        //     return {
        //       data: res?.data.items || [],
        //       success: true,
        //       total: res.data.totalCount,
        //     }
        //   }else {
        //     return {
        //       data: [],
        //       success: false,
        //       total: 0,
        //     };
        //   }
        // }}
        request={async (
          params,
          sort: Record<string, SortOrder>,
          filter: Record<string, React.ReactText[] | null>,
        ) => {
          const res: any = await getInterfaceInfoListInterfaceInfoByPageListPage({
            ...params,
          });
          console.log("res",res);
          if (res?.data) {
            return {
              data: res?.data.items || [],
              success: true,
              total: res?.data.totalCount || 0,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}

        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Selected{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              Items &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      {/* <ModalForm
        title={'新建规则'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm> */}
      <UpdateModal
        columns={columns}
        onSubmit={async (value) => {
          console.log("value",value);
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
      {/* createModalOpen = createModalVisible in yupi project */}
      <CreateModal columns={columns} onCancel={() =>{handleModalVisible(false)}} onSubmit={(values) =>{handleAdd(values)}} visible={createModalVisible}/>
    </PageContainer>
  );
};
export default TableList;
