import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';
// import { ThermometerComponent } from 'src/app/components/thermometer/thermometer.component';

@Component({
    selector: 'app-artist-page',
    templateUrl: './artist-page.component.html',
    styleUrls: ['./artist-page.component.css'],
    standalone: false
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];
  hiddenArtist:boolean = true;
  hiddenAlbum:boolean = true;

  constructor(private route: ActivatedRoute,   
    private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.artistId = this.route.snapshot.paramMap.get('id');
    this.spotifyService.getArtist(this.artistId).then(artist => {
      this.artist = artist;
  }).catch(error => {
      console.error('Error fetching artist:', error);
  });
  
  this.spotifyService.getAlbumsForArtist(this.artistId).then(albums => {
      this.albums = albums;
  }).catch(error => {
      console.error('Error fetching albums:', error);
  });
  
  this.spotifyService.getTopTracksForArtist(this.artistId).then(topTracks => {
      this.topTracks = topTracks;
  }).catch(error => {
      console.error('Error fetching top tracks:', error);
  });
  

    //TODO: Inject the spotifyService and use it to get the artist data, top tracks for the artist, and the artist's albums
    
  }

}
