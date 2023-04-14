import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch , RootState} from "../../../store/store";
import { registerUser, iUser, loginUser } from "../../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.auth.status);
  const navigate = useNavigate();

  const handleSubmit = async(values: iUser) => {
    dispatch(loginUser(values));
    navigate('/')
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
        {status === "failed" && (
          <p className='text-red-500 text-sm flex justify-end my-2'>Email or password is incorrect</p>
        )}
        {status === "success" && (
          <p className='text-green-500 text-sm flex justify-end my-2'>Login success</p>
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
          Are you don't have an account?
          <Link  className='ml-2 underline' 
           to='/register'> Resgiter</Link>
        </p>
      </Form>
    </div>
  );
}

export default LoginPage;
