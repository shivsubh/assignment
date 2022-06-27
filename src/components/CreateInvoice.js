import React from "react";
import "antd/dist/antd.css";
import {
  DatePicker,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Alert,
} from "antd";
import { Layout } from "antd";
import { useState } from "react";
import axios from "axios";
const { Option } = Select;

const { Header, Footer, Sider, Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 50,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const App = () => {
  const [form] = Form.useForm();

  const [success, setSuccess] = useState("");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    axios.post("https://rscdev.taxadda.com/api/invoice/add", values);
    setSuccess("Invoice Created Successfully.");
    form.resetFields();
    setTimeout(() => {
      setSuccess("");
    }, 5000);
  };

  return (
    <Layout>
      <Header>
        <h2 className="header"> Create Invoice</h2>
      </Header>
      {success && <Alert message={success} type="success" />}
      <Content style={{ margin: "1rem" }}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          style={{ width: "80vw" }}
        >
          <Form.Item
            name="name"
            label="Client Name"
            rules={[
              {
                type: "username",
                message: "The input is not valid Client's name",
              },
              {
                required: true,
                message: "Please input your Clients's name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select the status",
              },
            ]}
          >
            <Select>
              <Option value="Due">Due</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>

          <Form.Item name="billNo" label="Bill No.">
            <InputNumber min={0} max={Number.POSITIVE_INFINITY} />
          </Form.Item>

          <Form.Item name="billDate" label="Bill Date" {...config}>
            <DatePicker />
          </Form.Item>

          <Form.Item name="dueDate" label="Due Date" {...config}>
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="grossAmount"
            label="Gross Amount"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input your Gross Amount!",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={Number.POSITIVE_INFINITY}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="gstAmount"
            label="GST Amount"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input your GST Amount!",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={Number.POSITIVE_INFINITY}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="netAmount"
            label="Net Amount"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input your GST Amount!",
              },
            ]}
          >
            <InputNumber
              min={0}
              max={Number.POSITIVE_INFINITY}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
            rules={[
              {
                required: true,
                message: "Please input Notes.",
              },
            ]}
          >
            <Input.TextArea showCount />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default App;
