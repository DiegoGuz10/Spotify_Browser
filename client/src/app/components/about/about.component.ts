import { Component, OnInit } from '@angular/core';
//taken from search.component.ts
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
  constructor(private service:SpotifyService) { }

  ngOnInit() {
  }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */
  //when the component is ran, the about me section of the profile page is updated through a call to Express.
  async updateAboutMe() {
    this.service.aboutMe().then((data) => {
      this.name = data.name;
      this.profile_pic = data.imageURL;
      this.profile_link = data.spotifyProfile;
    });
  }
}


//https://masoudx.medium.com/dependency-injection-in-typescript-7bb8fdd2863c
//https://sagrawal003.medium.com/when-to-use-curly-braces-in-es6-import-technolize-your-future-79db0853b263
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
