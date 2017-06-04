import React from 'react';
//import { Link } from 'react-router-dom'
var {connect} = require('react-redux');
//import { withRouter } from 'react-router-dom'
import { Link } from 'react-router'

export class NewMovieTile extends React.Component {
    
    render() {
        var movie = this.props;

        var filename = encodeURIComponent(movie.filename);

        return (
            <div>
                <li className="list-group-item"><Link className="nav-link"to={`/newmovie/${filename}`}>{movie.filename}</Link></li>
            </div>
        )
    }
}

export default connect(
    (state) => {
    return state;
  }
)(NewMovieTile)
