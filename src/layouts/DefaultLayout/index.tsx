// DefaultLayout: Header, Footer
import Footer from "../partials/Footer";
import Header from "../partials/Header";

function DefaultLayout({ children }: any): JSX.Element {
  return (
    <div className='wrapper flex flex-col'>
      <Header />
      <div className='content'>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
