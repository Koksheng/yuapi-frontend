import { ProTable, PageContainer, ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, ConfigProvider, Drawer, Image, Space, message } from 'antd';
import React, { useRef, useState, ReactNode } from 'react';
import enUS from 'antd/es/locale/en_US';
import { getUserListUserByPageListPage, postUserUpdateUser } from '@/services/yuapi-backend/user';
import UpdateModal from './components/UpdateModal';

const TableList: React.FC = () => {
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserSafetyResponse>();

  const handleUpdate = async (fields: API.UserSafetyResponse) => {
    if(!currentRow){
      return;
    }
    const hide = message.loading('Updating');
    try {
      await postUserUpdateUser({
        id: currentRow.id,
        ...fields
      });
      hide();
      message.success('Updated successfully and will refresh soon');
      handleUpdateModalVisible(false);
      setCurrentRow(undefined);
      actionRef.current?.reload(); // Reload the table data
      return true;
    } catch (error: any) {
      hide();
      message.error('Configuration failed, '+ error.response.data.title);
      return false;
    }
  };

  const columns: ProColumns<API.AdminPageUserSafetyResponse>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
        }]
      }
    },
    {
      title: 'User Account',
      dataIndex: 'userAccount',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
        }]
      }
    },
    {
      title: 'Avatar',
      dataIndex: 'userAvatar',
      hideInSearch: true,
      render: (_: ReactNode, record: API.UserSafetyResponse) => (
        <div>
          <Image src={record.userAvatar} width={100} />
        </div>
      ),
    },
    { 
      title: 'Gender',
      dataIndex: 'gender',
      valueType: 'select',
      valueEnum: {
        1: {
          text: 'Female',
          status: 'Error',
        },
        0: {
          text: 'Male',
          status: 'Success',
        },
      },
      fieldProps: {
        options: [
          { label: 'Male', value: 0 },
          { label: 'Female', value: 1 },
        ],
      },
    },
    {
      title: 'Role',
      dataIndex: 'userRole',
      // copyable: true,
    },
    { 
      title: 'Status',
      dataIndex: 'isDelete',
      valueType: 'select',
      valueEnum: {
        1: {
          text: 'Inactive',
          status: 'Error',
        },
        0: {
          text: 'Active',
          status: 'Success',
        },
      },
      fieldProps: {
        options: [
          { label: 'Active', value: 0 },
          { label: 'Inactive', value: 1 },
        ],
      },
    },
    {
      title: 'Create Time', //创建时间
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: 'Update Time', //更新时间
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: 'Action', //操作
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            key="update"
            style={{ padding: '0px' }}
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrentRow(record);
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return(
    <ConfigProvider locale={enUS}>
      <PageContainer>
        <ProTable<API.RuleListItem, API.PageParams>
          // headerTitle={'查询表格'}
          actionRef={actionRef}
          rowKey="key"
          search={{
            labelWidth: 120,
          }}
          request={async (
            params,
            sort: Record<string, SortOrder>,
            filter: Record<string, React.ReactText[] | null>,
          ) => {
            const res: any = await getUserListUserByPageListPage({
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
          scroll={{ x: 1500 }} // enable horizontal scroll
        />
        {/* <CreateModal
          visible={createModalVisible}
          columns={columns}
          onCancel={() => handleModalVisible(false)}
          onSubmit={handleAdd}
        /> */}
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
      </PageContainer>
    </ConfigProvider>
  );
};
export default TableList;