import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (  
        <div className='flex flex-col items-center justify-center h-screen'>
            <Result
                status='404'
                title='404'
                subTitle='Sorry, the page you visited does not exist.'
                extra={<Button
                    type='default'
                >
                    <Link to='/'>Back Home</Link>
                </Button>}
            />


        </div>
    );
}

export default NotFoundPage;