import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl: string = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  private sendRequestToExpress(endpoint: string): Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //Specifically, update the URI according to the base URL for express and the endpoint.
    // I followed some code hints to edit this a bit.  
    const uri = `${this.expressBaseUrl}/${endpoint}`;
    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  async aboutMe(): Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('me').then((data) => {
      return new ProfileData(data);
    });
  }

  async searchFor(category: string, resource: string): Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.

    // const encodedURI = `search/${category}/${resource}`;
    const endpoint = encodeURIComponent(resource);
    const data = await this.sendRequestToExpress(`search/${category}/${endpoint}`);
    
    switch (category) {
      case 'artist':        
        return data.artists.items.map(artist => new ArtistData(artist));
      case 'album':
        return data.albums.items.map(album => new AlbumData(album));
      case 'track':
        return data.tracks.items.map(track => new TrackData(track));
      default:
        return []; 
    }
  }

  // getArtist(artistId: string): Promise<ArtistData> {
  //   //TODO: use the artist endpoint to make a request to express.
  //   //Again, you may need to encode the artistId.
    
  //   return this.sendRequestToExpress(`artist/${artistId}`).then((data) => {
  //   return new ArtistData(data);
  //   })
  // }
  getArtist(artistId: string): Promise<ArtistData> {
    const safeArtistId = encodeURIComponent(artistId);
    return this.sendRequestToExpress(`artist/${safeArtistId}`).then((data) => {
        return new ArtistData(data);
    });
  }


  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    return this.sendRequestToExpress(`artist-top-tracks/${artistId}`).then((data) => {
      return data.tracks.map(track => new TrackData(track)); 
    });
  }
  
  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    return this.sendRequestToExpress(`artist-albums/${artistId}`).then((data) => {
      return data.items.map(album => new AlbumData(album)); 
    });
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress(`album/${albumId}`).then((data) => {
      return new AlbumData(data);
    })
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    return this.sendRequestToExpress(`album-tracks/${albumId}`).then((data) => {
        return data.items.map(track => new TrackData(track));
    });
  }


  getTrack(trackId: string): Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress(`track/${trackId}`).then((data) => {
      return new TrackData(data);
    })
  }
}