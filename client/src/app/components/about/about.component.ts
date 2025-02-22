import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ProfileData } from '../../data/profile-data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {
  name: string = null;
  profile_pic: string = null;
  profile_link: string = null;
  // for hiding information before login
  isLoggedIn = false;


  //TODO: inject the Spotify service
  constructor(private spotify: SpotifyService) { }

  ngOnInit() {
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
 In that function, update the name, profile_pic, and profile_link fields */
  loadMe() {

    this.spotify.aboutMe().then((data: ProfileData) => {
      this.name = data.name;
      this.profile_pic = data.imageURL ? data.imageURL: 'assets/unknown.jpg';
      this.profile_link = data.spotifyProfile;
      this.isLoggedIn = true;
    }).catch(() =>{
      this.profile_pic = 'assets/unknown.jpg';
    }
    )
  }
}
