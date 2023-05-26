import {Redirect, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const {history} = props
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-cont">
      <nav className="nav-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="logo"
          className="logo"
        />
        <div>
          <button onClick={onClickLogout} type="button" className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
      <div className="content-cont">
        <h1 className="heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card-img"
        />
      </div>
    </div>
  )
}

export default withRouter(Home)
