import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal, Form } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfoSafetyResponse>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfoSafetyResponse) => Promise<void>;
  visible: boolean;
};

const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onCancel, onSubmit } = props;
  const [form] = Form.useForm();

  return (
    <Modal visible={visible} footer={null} onCancel={() => {
        onCancel?.();
        form.resetFields(); // Reset form fields when modal is closed
      }}>
      <ProTable<API.InterfaceInfoSafetyResponse, API.InterfaceInfoSafetyResponse>
        type="form"
        form={{
          form,
        }}
        columns={columns}
        onSubmit={async (value) => {
          const success = await onSubmit?.(value);
          if (success) {
            form.resetFields(); // Reset form fields after successful submission
          }
        }} 
      />
    </Modal>
  );
};
export default CreateModal;
