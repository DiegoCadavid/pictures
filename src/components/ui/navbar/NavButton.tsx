interface Props {
  children: React.ReactNode;
}

const NavButton = ({children}: Props) => {
  return (
    <button className="btn-icon  btn-secondary flex-1">{ children }</button>
  )
}

export default NavButton