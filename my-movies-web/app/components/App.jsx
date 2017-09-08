import React from "react";
import { connect } from "react-redux";
//import { ProgressBar } from "react-bootstrap";
import Navigation from 'app/components/Navigation'
//import Menu from "./common/Menu";
//import "../stylesheets/main.scss";

// App component
export class App extends React.Component {
  // pre-render logic
  componentWillMount() {
    // the first time we load the app, we need that users list
  //  this.props.dispatch({type: 'USERS_FETCH_LIST'});
  }

  // render
  render() {
    // show the loading state while we wait for the app to load
    const {children} = this.props;
  /*  if (!users.length) {
      return (
        <ProgressBar active now={100}/>
      );
    }
*/
    // render
    return (
      <div>
        <header>
          <nav className="nav">
            <ul className="navbar">
              <li><a>Home</a></li>
              <li><a href="/movies">Watchlist</a></li>

              </ul>
            </nav>
        </header>
        <div>
          <Navigation/>
          {children}
        </div>
        <div>
          <span>
            My Movies List App
          </span>
        </div>
      </div>
    );
  }
}

// export the connected class
function mapStateToProps(state) {
  return {
    users: state.users || [],
  };
}
export default connect(mapStateToProps)(App);
