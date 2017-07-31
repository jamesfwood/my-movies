import React from 'react';

import Dock from 'react-dock'
import MovieTile from 'app/components/MovieTile'
import MoviesControlPanel from 'app/components/MoviesControlPanel'
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

const styles = {
  root: {
    fontSize: '16px',
    color: '#999',
    height: '100vh'
  },
  main: {
    width: '100%',
    height: '150%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '30vh'
  },
  dockContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  remove: {
    position: 'absolute',
    zIndex: 1,
    right: '10px',
    top: '10px',
    cursor: 'pointer'
  }
}
const positions = ['left', 'top', 'right', 'bottom'];
const dimModes = ['transparent', 'none', 'opaque'];

export class Movies extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      positionIdx: 0,
      dimModeIdx: 1,
      isVisible: true,
      fluid: true,
      customAnimation: false,
      slow: false,
      size: 0.25
    };
  }

    render() {
        const duration = this.state.slow ? 2000 : 200;
    const dur = duration / 1000;
    const transitions = ['left', 'top', 'width', 'height']
      .map(p => `${p} ${dur}s cubic-bezier(0, 1.5, 0.5, 1)`)
      .join(',');

        var {movies} = this.props;

        var renderMovies = () => {

          return movies.map( (movie) => {
              return (
                <MovieTile key={movie.filename} {...movie}/>
              );
            });
        };
      
        return (
            <div>
              <div className="container-fluid">
                <div className="row">
                    <div className='col-3'>
                        <MoviesControlPanel/>
                    </div>
                    <div className='col-9'>
                        <div className="row">
                        { renderMovies() }
                        </div>
                    </div>
                  
                </div>
              </div>
            </div>
        );
    }
}

export default Movies
