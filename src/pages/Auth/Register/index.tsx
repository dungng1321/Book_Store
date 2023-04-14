import  { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { registerUser, iUser } from "../../../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const status = useSelector((state: RootState) => state.auth.status);

  const handleSubmit = async (values: iUser) => {
    await dispatch(registerUser(values));
  };

  useEffect(() => {
    if (status === "success") {
      navigate("/login");
    }
  }, [status]);

  return (
    <div className='register-page inset-0 flex justify-center items-center bg-[#FF7F75] h-screen'>
      <Form
        className='w-96 bg-white rounded-lg p-8 shadow-xl'
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        autoComplete='off'
        onFinish={handleSubmit}
      >
        <h1 className='text-2xl font-bold text-center mb-4'>Register</h1>
        <Form.Item
          label='Fullname'
          name='fullName'
          rules={[
            { required: true, message: "Please input your username!" },

            { max: 20, message: "Username must be at most 20 characters!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Phone'
          name='phone'
          rules={[
            { required: true, message: "Please input your phone!" },
            // invalide phone number , start with 0, 1-9, 10-11 digits
            { pattern: /^0[1-9]\d{8,9}$/, message: "Phone number is invalid!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: "Please input your email!" },
            // invalide email
            {
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Email is invalid!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        {status === "success" && (
          <p className='text-green-500 mb-2 flex justify-end'>
            Register success
          </p>
        )}
        {status === "failed" && (
          <p className='text-red-500 mb-2 flex justify-end'>
            Register failed or user already exists
          </p>
        )}
        <Form.Item wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
          <Button
            htmlType='submit'
            className='
            w-full bg-[#564779] text-white text-[16px]  flex items-center justify-center rounded-lg '
          >
            Register
          </Button>
        </Form.Item>
        <p>
          Already have an account?{" "}
          <Link className='ml-2 underline' to='/login'>
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default RegisterPage;
