import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Form, Input, Tooltip, Select, Checkbox, Button } from "antd";
import { FormA } from "./style";
import { registerA } from "redux/auth/actions";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons";
const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const onFinish = async () => {
    setLoading(true);
    await dispatch(
      registerA({
        firstName,
        lastName,
        email,
        nickName,
        password,
        gender,
        history,
      })
    );
    setLoading(false);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  return (
    <FormA
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: "84",
      }}
      scrollToFirstError
    >
      <h1>Register</h1>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your First Name!",
            whitespace: true,
          },
        ]}
        onChange={(e) => setFirstName(e.target.value)}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="LastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input your Last Name!",
            whitespace: true,
          },
        ]}
        onChange={(e) => setLastName(e.target.value)}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="nickname"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
        ]}
        onChange={(e) => setNickName(e.target.value)}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
        onChange={(e) => setEmail(e.target.value)}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
        onChange={(e) => setPassword(e.target.value)}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="phone" label="Phone Number">
        <Input
          addonBefore={prefixSelector}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="...." allowClear onSelect={(e) => setGender(e)}>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement"),
          },
        ]}
      >
        <Checkbox>
          I have read the <a href="/">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {loading ? <LoadingOutlined /> : "Register"}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button href="/login" type="default">
          Back to login
        </Button>
      </Form.Item>
    </FormA>
  );
};

export default Register;
