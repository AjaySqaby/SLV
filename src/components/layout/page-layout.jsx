import Header from "./header"
import Sidebar from "./sidebar"

export default function PageLayout({ children, activePage, pageTitle, onHeaderSearch, headerSearchPlaceholder, hideHeaderSearch }) {
  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar activePage={activePage} />
      <div className="flex-1 flex flex-col ">
        <Header activePage={pageTitle} onSearch={onHeaderSearch} searchPlaceholder={headerSearchPlaceholder} hideSearch={hideHeaderSearch} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}
