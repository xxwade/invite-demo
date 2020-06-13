import { Button, Checkbox, Form, Input, Modal } from 'antd'
import React, { useCallback, useState } from 'react';

import { useRequest } from '@umijs/hooks';

interface IProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function(props: IProps) {
  const { visible, onOk, onCancel} = props;
  const onFinish = useCallback((values: any) => {
    console.log('Success:', values);
  }, []);

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }, []);

  const { data, error, loading } = useRequest({
    url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
    method: 'post',
    data: {
      name: 'xuxin',
      email: 'xxwade2010@163.com'
    }
  });

  console.log(data, error, loading);
  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
