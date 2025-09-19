import Header from "./header"
import Sidebar from "./sidebar"

export default function PageLayout({ children, activePage, pageTitle, onHeaderSearch }) {
  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar activePage={activePage} />
      <div className="flex-1 flex flex-col ">
        <Header activePage={pageTitle} onSearch={onHeaderSearch} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}
