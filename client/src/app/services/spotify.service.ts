import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl:string = 'http://localhost:8888';


  constructor(private http:HttpClient) { }


  private sendRequestToExpress(endpoint:string):Promise<any> {
    return firstValueFrom(this.http.get(this.expressBaseUrl + endpoint)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }


  aboutMe():Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }


  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    let resources: ResourceData[]
    let encodedResource = encodeURIComponent(resource);
    return this.sendRequestToExpress('/search'+'/'+category+'/'+encodedResource).then((data) => {
      
      if(category=='artist'){
        resources = data['artists']['items'].map((element) => {
          return new ArtistData(element);
        });
 
      }
      else if(category=='album'){
        resources = data['albums']['items'].map((element) => {
          return new AlbumData(element);
        });
 
      }
      else if(category=='track'){
        resources = data['tracks']['items'].map((element) => {
          return new TrackData(element);
        });
 
      }
      return resources;

    },
    (err) => {
      console.log(err);
      return err;
    });
  }



  /*
    The following get methods make requests to the Spotify API using the appropriate endpoints, then format the data into
    an appropriate form to return it. If an error arises, it returns the error data instead and logs it to the console.
    NOTE: the endpoints provided on the Spotify API website are all out of date; we found the endpoints through trial and
    error of messing with the endpoints given on the website.
  */

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    let encodedArtist = encodeURIComponent(artistId);

    //https://developer.spotify.com/documentation/web-api/reference/get-an-artist
    return this.sendRequestToExpress('/artist/'+encodedArtist).then((data) => {
        return new ArtistData(data);

    },
    (err) => {
      console.log(err);
      return err;
    })
  }


  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    let resourcesRelatedArtistData: ResourceData[]
    let encodedArtist = encodeURIComponent(artistId);

    //https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
    return this.sendRequestToExpress("/artist-related-artists/"+encodedArtist).then((data) => {
      resourcesRelatedArtistData = data['artists'].map((element) => {
        return new ArtistData(element);
      });
      return resourcesRelatedArtistData;
      
    }, (err) => {
      console.log(err);
      return err;
    })
  }


  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    let resourcesTracksArtistData: ResourceData[]
    let encodedArtist = encodeURIComponent(artistId);

    //https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
    return this.sendRequestToExpress('/artist-top-tracks/'+encodedArtist).then((data) => {
      resourcesTracksArtistData = data['tracks'].map((element) => {
        return new TrackData(element);
      });
      return resourcesTracksArtistData;

    }, (err) => {
      console.log(err);
      return err;
    })
  }


  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    let resourcesAlbumsArtistData: ResourceData[]
    let encodedArtist = encodeURIComponent(artistId);

    //https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
    return this.sendRequestToExpress("/artist-albums/" +encodedArtist).then((data) => {
      resourcesAlbumsArtistData = data['items'].map((element) => {
        return new AlbumData(element);
      });
      return resourcesAlbumsArtistData;

    }, (err) => {
      console.log(err);
      return err;
    })
  }


  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    let encodedAlbum = encodeURIComponent(albumId);

    //https://developer.spotify.com/documentation/web-api/reference/get-an-album
    return this.sendRequestToExpress('/album/'+encodedAlbum).then((data) => {
      return new AlbumData(data);

    }, (err) => {
      console.log(err);
      return err;
    })
  }


  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    let encodedAlbum = encodeURIComponent(albumId);

    //https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
    return this.sendRequestToExpress('/album-tracks/'+encodedAlbum).then((data) => {
      return data['items'].map(function(element) {
        return new TrackData(element);
      })

    }, (err) => {
      console.log(err);
      return err;
    })
  }


  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    let encodedTrack = encodeURIComponent(trackId);

    //https://developer.spotify.com/documentation/web-api/reference/get-track
    return this.sendRequestToExpress('/track/'+encodedTrack).then((data) => {
      return new TrackData(data);

    }, (err) => {
      console.log(err);
      return err;
    })
  }


  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    let encodedTrack = encodeURIComponent(trackId);

    //https://developer.spotify.com/documentation/web-api/reference/get-audio-features
    return this.sendRequestToExpress('/track-audio-features/'+encodedTrack).then((data) => {
      let features = [];
      for(let i=0; i < TrackFeature.FeatureTypes.length; i++) {
        let feature = TrackFeature.FeatureTypes[i];
        features.push(new TrackFeature(feature, data[feature]));
      }
      return features;

    }, (err) => {
      console.log(err);
      return err;
    })
  }
}




//The Slack post made by Prof. Baldwin made Nov 3, 9:13AM
//https://rxjs.dev/api/index/function/firstValueFrom
//https://www.w3schools.com/js/js_promise.asp
//https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp
//https://www.geeksforgeeks.org/why-we-use-then-method-in-javascript/#
//https://ihechikara.com/posts/how-to-use-route-parameter-in-expressjs/
//https://www.w3schools.com/jsref/jsref_map.asp


//ENDPOINTS 
//https://developer.spotify.com/documentation/web-api/reference/get-an-artist
//https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
//https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
//https://developer.spotify.com/documentation/web-api/reference/get-an-album
//https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
//https://developer.spotify.com/documentation/web-api/reference/get-track
//https://developer.spotify.com/documentation/web-api/reference/get-audio-features
