import { MinusIcon, Square2StackIcon, XMarkIcon } from '@heroicons/react/24/outline'

function NavTitle(): React.JSX.Element {
  return (
    <nav className="drag w-full z-50 fixed top-0 flex items-center justify-between px-4 py-1 bg-gray-950  rounded-t-[1rem] select-none">
      <div className="">
        <h1 className=" text-indigo-500">Youtube Downloader</h1>
      </div>
      <div className="flex flex-row-reverse text-indigo-500/70 gap-2 no-drag">
        <XMarkIcon
          onClick={() => {
            window.titleBarOptions.close()
          }}
          className="w-5 h-5 hover:cursor-pointer transition duration-300 hover:scale-110 hover:text-indigo-500"
        />
        <Square2StackIcon
          onClick={() => {
            window.titleBarOptions.maximize()
          }}
          className="w-5 h-5 hover:cursor-pointer transition duration-300 hover:scale-110 hover:text-indigo-500"
        />
        <MinusIcon
          onClick={() => {
            window.titleBarOptions.minimize()
          }}
          className="w-5 h-5 hover:cursor-pointer transition duration-300 hover:scale-110 hover:text-indigo-500"
        />
      </div>
    </nav>
  )
}

export default NavTitle
