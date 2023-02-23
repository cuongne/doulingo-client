import { HamburgerIcon, MoonIcon } from '@chakra-ui/icons'
import { Link, Outlet } from 'react-router-dom'
import './style.scss'
type Props = {}
const MenuMain = () => {
  return (
    <div className="menu">
      <Link to='/learn'>
        <div className="item">
          <MoonIcon />
          Learn
        </div>
      </Link>
      <Link to='/store'>
        <div className="item">
          <HamburgerIcon />
          Store
        </div>
      </Link>
    </div>
  )
}
const Home = (props: Props) => {
  return (
    <div className="home-container">
      <MenuMain />
      <Outlet />
    </div>
  )
}
export default Home