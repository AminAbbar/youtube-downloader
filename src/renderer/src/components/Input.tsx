interface Props {
  handler: VoidFunction
}
function Input({ handler }: Props): React.JSX.Element {
  return (
    <div className="mt-2">
      <input
        id="fullname"
        name="fullname"
        type="text"
        autoComplete="fullname"
        onChange={handler}
        required
        className="block w-full focus:scale-105 transition-all duration-300 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
      />
    </div>
  )
}

export default Input
