import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import React from "react";

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

// We can just import Slider or Range to reduce bundle size
// import Slider from 'rc-slider/lib/Slider';
// import Range from 'rc-slider/lib/Range';

var {connect} = require('react-redux');
var actions = require('app/actions/');

export class MoviesControlPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      genreAction: true,
      genreAdventure: true,
      genreAnimation: true,
      genreBiography: true,
      genreComedy: true,
      genreCrime: true,
      genreDocumentary: true,
      genreDrama: true,
      genreFamily: true,
      genreFantasy: true,
      genreFilmNoir: true,
      genreHistory: true,
      genreHorror: true,
      genreMusic: true,
      genreMusical: true,
      genreMystery: true,
      genreRomance: true,
      genreSciFi: true,
      genreSport: true,
      genreThriller: true,
      genreWar: true,
      genreWestern: true,
    };

    this.handleGenre = this.handleGenre.bind(this);
    this.handleGenreToggle = this.handleGenreToggle.bind(this);
  }
  
  handleSortBy(event) {
    console.log("change sortby", event);

    var {dispatch} = this.props;

    dispatch(actions.sortBy(event.target.value));
  }

  onRunTimeSliderChange(value) {
    
    console.log("Runtime slider changed", value);

    var {dispatch} = this.props;

    dispatch(actions.setRuntimeRange(value));
  }

  handleShowWatched(event) {
    //const value = event.target.checked;
    
    var {dispatch} = this.props;

    dispatch(actions.toggleWatched());
  }

  handleGenre(event) {
    
    let genre = event.target.labels[0].innerText;
    let value = event.target.checked;
    let name = 'genre' + genre.replace('-', '');

    this.setState( {
      [name]: value
    });

    var {dispatch} = this.props;

    dispatch(actions.updateGenre(genre, value));
  }

  handleGenreToggle(event) {
    
    this.setState( (prevState, props) => {

      var genres = [];

      if (!prevState.genreAction) { genres.push("Action"); }
      if (!prevState.genreAdventure) { genres.push("Adventure"); }
      if (!prevState.genreAnimation) { genres.push("Animation"); }
      if (!prevState.genreBiography) { genres.push("Biography"); }
      if (!prevState.genreComedy) { genres.push("Comedy"); }
      if (!prevState.genreCrime) { genres.push("Crime"); }
      if (!prevState.genreDocumentary) { genres.push("Documentary"); }
      if (!prevState.genreDrama) { genres.push("Drama"); }
      if (!prevState.genreFamily) { genres.push("Family"); }
      if (!prevState.genreFantasy) { genres.push("Fantasy"); }
      if (!prevState.genreFilmNoir) { genres.push("Film-Noir"); }
      if (!prevState.genreHistory) { genres.push("History"); }
      if (!prevState.genreHorror) { genres.push("Horror"); }
      if (!prevState.genreMusic) { genres.push("Music"); }
      if (!prevState.genreMusical) { genres.push("Musical"); }
      if (!prevState.genreMystery) { genres.push("Mystery"); }
      if (!prevState.genreRomance) { genres.push("Romance"); }
      if (!prevState.genreSciFi) { genres.push("Sci-Fi"); }
      if (!prevState.genreSport) { genres.push("Sport"); }
      if (!prevState.genreThriller) { genres.push("Thriller"); }
      if (!prevState.genreWar) { genres.push("War"); }
      if (!prevState.genreWestern) { genres.push("Western"); }

      var {dispatch} = this.props;

      dispatch(actions.updateGenres(genres));

      return {
        genreAction: !prevState.genreAction,
        genreAdventure: !prevState.genreAdventure,
        genreAnimation: !prevState.genreAnimation,
        genreBiography: !prevState.genreBiography,
        genreComedy: !prevState.genreComedy,
        genreCrime: !prevState.genreCrime,
        genreDocumentary: !prevState.genreDocumentary,
        genreDrama: !prevState.genreDrama,
        genreFamily: !prevState.genreFamily,
        genreFantasy: !prevState.genreFantasy,
        genreFilmNoir: !prevState.genreFilmNoir,
        genreHistory: !prevState.genreHistory,
        genreHorror: !prevState.genreHorror,
        genreMusic: !prevState.genreMusic,
        genreMusical: !prevState.genreMusical,
        genreMystery: !prevState.genreMystery,
        genreRomance: !prevState.genreRomance,
        genreSciFi: !prevState.genreSciFi,
        genreSport: !prevState.genreSport,
        genreThriller: !prevState.genreThriller,
        genreWar: !prevState.genreWar,
        genreWestern: !prevState.genreWestern,
      }
    }
    );

     
  }

  // render
  render() {
    return (
      <div>
        <h2>Controls</h2>
        <div className="form-group row">
          <div className="col-sm-12">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="showWatched" type="checkbox" onChange={this.handleShowWatched.bind(this)}/>Show Watched
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-3" htmlFor="sortOrder">Sort Order</label>
          <div className="col-9">
            <select className="form-control" id="sortOrder" onChange={ () => {

              console.log("toggle orderby");

              var {dispatch} = this.props;

              dispatch(actions.toggleOrderBy());
            }}>
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="sortBy">Sort By</label>
          <div className="col-8">
            <select className="form-control" id="sortBy" onChange={this.handleSortBy.bind(this)} >
              <option value="title">Title</option>
              <option value="runtime">Runtime</option>
              <option value="imdbRating">IMDB Rating</option>
              <option value="releaseDate">Release Date</option>
              <option value="budget">Budget</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="sortOrder">Runtime</label>
          <div className="col-9">
            <Range min={50} max={300} defaultValue={[50, 500]} onAfterChange={this.onRunTimeSliderChange.bind(this)} tipFormatter={value => {

                var minutes = Math.floor(value % 60)
                value /= 60
                var hours = Math.floor(value)

                return hours + "h " + minutes + "min";
            }} />
          </div>
        </div>
        <br/>
        <div className="form-group row">
          <div className="col-sm-4">
            <button className="btn btn-outline-success" type="button" onClick={this.handleGenreToggle}>Toggle Genres Selection</button>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Action" type="checkbox" checked={this.state.genreAction} onChange={this.handleGenre}/>Action
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Adventure" type="checkbox" checked={this.state.genreAdventure} onChange={this.handleGenre}/>Adventure
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Animation" type="checkbox" checked={this.state.genreAnimation} onChange={this.handleGenre}/>Animation
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Biography" type="checkbox" checked={this.state.genreBiography} onChange={this.handleGenre}/>Biography
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Comedy" type="checkbox" checked={this.state.genreComedy} onChange={this.handleGenre}/>Comedy
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Crime" type="checkbox" checked={this.state.genreCrime} onChange={this.handleGenre}/>Crime
              </label>
            </div>
          </div>
        </div>
                <div className="form-group row">
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Documentary" type="checkbox" checked={this.state.genreDocumentary} onChange={this.handleGenre}/>Documentary
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Drama" type="checkbox" checked={this.state.genreDrama} onChange={this.handleGenre}/>Drama
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Family" type="checkbox" checked={this.state.genreFamily} onChange={this.handleGenre}/>Family
              </label>
            </div>
          </div>
        </div>
                <div className="form-group row">
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Fantasy" type="checkbox" checked={this.state.genreFantasy} onChange={this.handleGenre}/>Fantasy
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Film-Noir" type="checkbox" checked={this.state.genreFilmNoir} onChange={this.handleGenre}/>Film-Noir
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="History" type="checkbox" checked={this.state.genreHistory} onChange={this.handleGenre}/>History
              </label>
            </div>
          </div>
        </div>
                <div className="form-group row">
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Horror" type="checkbox" checked={this.state.genreHorror} onChange={this.handleGenre}/>Horror
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Music" type="checkbox" checked={this.state.genreMusic} onChange={this.handleGenre}/>Music
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Musical" type="checkbox" checked={this.state.genreMusical} onChange={this.handleGenre}/>Musical
              </label>
            </div>
          </div>
        </div>
                <div className="form-group row">
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Mystery" type="checkbox" checked={this.state.genreMystery} onChange={this.handleGenre}/>Mystery
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Romance" type="checkbox" checked={this.state.genreRomance} onChange={this.handleGenre}/>Romance
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Sci-Fi" type="checkbox" checked={this.state.genreSciFi} onChange={this.handleGenre}/>Sci-Fi
              </label>
            </div>
          </div>
        </div>
                <div className="form-group row">
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Sport" type="checkbox" checked={this.state.genreSport} onChange={this.handleGenre}/>Sport
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Thriller" type="checkbox" checked={this.state.genreThriller} onChange={this.handleGenre}/>Thriller
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="War" type="checkbox" checked={this.state.genreWar} onChange={this.handleGenre}/>War
              </label>
            </div>
          </div>
        </div>
                <div className="form-group row">
          <div className="col-sm-4">
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" name="Western" type="checkbox" checked={this.state.genreWestern} onChange={this.handleGenre}/>Western
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default /*withRouter(*/connect(
    (state) => {
    return state;
  }
)(MoviesControlPanel)
