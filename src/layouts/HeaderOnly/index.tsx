import Header from "../partials/Header";

function HeaderOnLy({ children }: { children: React.ReactNode }) {
  return (
    <div className='wrapper flex flex-col'>
      <Header />
      <div className='content'>{children}</div>
    </div>
  );
}

export default HeaderOnLy;
