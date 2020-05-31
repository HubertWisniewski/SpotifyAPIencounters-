import React, {Component} from 'react';
import './Home.css'
import Moment from 'react-moment';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify()

class Home extends Component {
constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
        loggedIn: params.access_token ? true : false,
        nowPlaying: {
            name: 'Not Checked',
            image: ''
        }
    }
    if (params.access_token){
        spotifyWebApi.setAccessToken(params.access_token)
    }

}

    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState().then((response) => {
            this.setState({
                nowPlaying: {
                    name: response.item.name,
                    image: response.item.album.images[0].url
                }
            })
        })
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }
    
    render(){
        return (

            <div className='wrapper'>
                <h2>
                    <Moment format='MMM Do YYYY'></Moment>
                    <a href='http://localhost:8888'>
                    <button>Login With Spotify</button>
                    </a>                   
                    <div>Now Playing: {this.state.nowPlaying.name} </div>
                    <div><img src={this.state.nowPlaying.image} style={{width: 300 + 'px'}} alt=''/></div>
                    <button onClick={() => this.getNowPlaying()}>Check Now Playing</button>
                </h2>

            </div>
        )

    }
}

export default Home 