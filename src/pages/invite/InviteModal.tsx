import { Button, Form, Input, Modal } from 'antd'
import React, { useCallback, useState } from 'react';
import { useRequest } from '@umijs/hooks';
import { APP_NAME } from '@/const/app'
import { sendInvition } from './api';

interface IProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export default function(props: IProps) {
  const { visible, onOk, onCancel} = props;

  const [ successModalVisible, setSuccessModalVisible ] = useState(false)
  const [ errorMsg, setErrorMsg ] = useState('')
  const [ form ] = Form.useForm();
  const { loading, run } = useRequest(
    sendInvition,
    {
      manual: true,
      onSuccess: () => {
        form.resetFields();
        onOk();
        setSuccessModalVisible(true)
      },
      onError: (err) => {
        setErrorMsg(err.message)
      }
    }
  );

  const onSuccessModalOk = useCallback(() => {
    setSuccessModalVisible(false)
   }, [])
   const onSuccessModalCancel = useCallback(() => {
    setSuccessModalVisible(false);
   }, [])
  const onFinish = useCallback((values: any) => {
    run({
      name: values.name,
      email: values.email
    })
  }, []);
  const onValuesChange = useCallback((values) => {
    if (errorMsg) {
      setErrorMsg('')
    }
  }, [errorMsg]);

  return (
    <>
      <Modal
        title='Request an invite'
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        footer={null}
        width='320px'
        closable={false}
      >
        <Form
          name="invite demo"
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                validator: (rule, value = '') => {
                  const trimV = value.trim()
                  if (trimV && trimV.length < 3) {
                    return Promise.reject('The length must be greater than 3!');
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder='Username' />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              {
                type: 'email'
              }
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            name="confirmEmail"
            rules={[
              { required: true, message: 'Please input your confirmEmail!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('email') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two emails do not match!');
                },
              }),
            ]}
          >
            <Input placeholder='Confirm email' />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" block disabled={loading}>
              { loading ? 'Sending, please wait...' : 'Send' }
            </Button>
            <div className="error-message">
            {errorMsg}
          </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='success'
        visible={successModalVisible}
        onOk={onSuccessModalOk}
        onCancel={onSuccessModalCancel}
        footer={null}
        width='320px'
        closable={false}
      >
        <div className='success-message'>
          You will be one of the first to experience {APP_NAME} when we launch.
        </div>
        <Button onClick={onSuccessModalOk} block>Ok</Button>
      </Modal>
    </>
  )
}
