import React, { useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { InputMail, ButtonApplyPass, AvatarA } from "./style";
import { useDispatch } from "react-redux";
import { changeInfo, changePass } from "redux/auth/actions";
import { UserOutlined } from "@ant-design/icons";

const ModalProfile = ({ avatar, firstName, lastName, userName, email }) => {
  const [changePassword, setChangePassword] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(avatar);

  const dispatch = useDispatch();

  const showInput = () => {
    setChangePassword(!changePassword);
  };

  const onFinish = (values) => {
    dispatch(changeInfo(values));
  };

  const submitPassword = (values) => {
    console.log("submitPassword:", values);
    dispatch(changePass(values));
  };

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    nameUser: userName,
    email: email,
  };

  return (
    <div>
      <Form
        name="profile"
        onFinish={onFinish}
        initialValues={initialValues}
        scrollToFirstError
      >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          maxCount={2}
        >
          <AvatarA
            shape="square"
            src={avatarUrl}
            size={100}
            icon={<UserOutlined />}
          />
        </Upload>
        <Form.Item name="firstName" label="First Name">
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <Input />
        </Form.Item>
        <Form.Item label="Name User">
          <Input defaultValue={userName} disabled />
        </Form.Item>
        <Form.Item label="Email">
          <InputMail defaultValue={email} disabled />
        </Form.Item>
        <Form.Item>
          <ButtonApplyPass htmlType="submit" type="primary">
            Apply Change
          </ButtonApplyPass>
        </Form.Item>
      </Form>
      {changePassword ? (
        <Form onFinish={submitPassword}>
          <Form.Item
            name="OldPassword"
            rules={[
              {
                required: true,
                message: "Please input your Old password!",
              },
            ]}
          >
            <Input.Password placeholder="Old Password" />
          </Form.Item>

          <Form.Item
            name="NewPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your New password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("OldPassword") === value) {
                    return Promise.reject(
                      "New password cannot be the same as your old password"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>

          <Form.Item
            name="ConfirmPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("NewPassword") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Old Password" />
          </Form.Item>

          <ButtonApplyPass htmlType="submit" type="primary">
            Change Password
          </ButtonApplyPass>
          <Button type="dashed" danger onClick={showInput}>
            Cancel
          </Button>
        </Form>
      ) : (
        <Button htmlType="button" onClick={showInput}>
          Change your password
        </Button>
      )}
    </div>
  );
};

export default ModalProfile;
