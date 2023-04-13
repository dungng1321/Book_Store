// DefaultLayout: Header, Footer 
import Header from '../Header';
import Footer from '../Footer';

function DefaultLayout({ children }: any): JSX.Element{
    return ( 
        <div className='wrapper flex flex-col'>
            <Header />
            <div className='content'>
                {children}
            </div>
            <Footer />

        </div>
     );
}

export default DefaultLayout;