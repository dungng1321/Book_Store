import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IUser, loginUser, resetStatus } from "../../../store/authSlice";
import { AppDispatch, RootState } from "../../../store/store";

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { success, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: IUser) => {
  
      const result = await dispatch(loginUser(values));
      result.meta.requestStatus === "fulfilled" && navigate("/", {
        replace: true,
      });
      
  };
  
  

  return (
    <div className='register-page inset-0 flex justify-center items-center bg-[#FF7F75] h-screen'>
      <Form
        className='w-96 bg-white rounded-lg p-8 shadow-xl'
        wrapperCol={{ span: 24 }}
        labelCol={{ span: 24 }}
        autoComplete='off'
        onFinish={handleSubmit}
      >
        <h1 className='text-2xl font-bold text-center mb-4'>Login</h1>

        <Form.Item
          label='Email'
          name='username'
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
        {error && (
          <p className='text-red-500 text-sm flex justify-end my-2'>
            Email or password is incorrect
          </p>
        )}
        {success && (
          <p className='text-green-500 text-sm flex justify-end my-2'>
            Login success
          </p>
        )}

        <Form.Item wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
          <Button
            htmlType='submit'
            className='
            w-full bg-[#564779] text-white text-[16px]  flex items-center justify-center rounded-lg '
          >
            Login
          </Button>
        </Form.Item>
        <p>
          Are you don't have an account?
          <Link
            className='ml-2 underline'
            to='/register'
            onClick={() => dispatch(resetStatus())}
          >
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginPage;
