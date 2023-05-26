import {Component} from 'react'
import Cookie from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', showErrorMsg: false, errorMsg: ''}

  onSubmitLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/ebank/login'

    const response = await fetch(url, options)
    const fetchData = await response.json()
    console.log(fetchData)

    if (response.ok) {
      const {history} = this.props
      const jwtToken = fetchData.jwt_token
      Cookie.set('jwt_token', jwtToken, {expires: 30})
      this.setState({userId: '', pin: ''})

      history.replace('/')
    } else {
      this.setState({showErrorMsg: true, errorMsg: fetchData.error_msg})
    }
  }

  onChangeUserID = event => {
    this.setState({userId: event.target.value})
  }

  onChangePIN = event => {
    this.setState({pin: event.target.value})
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="app-container">
        <div className="sub-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt=" website login"
              className="image"
            />
          </div>

          <div className="form-container">
            <h1 className="heading">Welcome Back!</h1>
            <form className="form" onSubmit={this.onSubmitLogin}>
              <label className="label" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter User ID"
                id="userId"
                onChange={this.onChangeUserID}
                className="input-ele"
              />
              <label className="label" htmlFor="password">
                PIN
              </label>

              <input
                type="password"
                htmlFor="password"
                placeholder="Enter PIN"
                className="input-ele"
                onChange={this.onChangePIN}
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
