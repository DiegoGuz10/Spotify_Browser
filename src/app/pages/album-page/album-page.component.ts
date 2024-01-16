import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
  albumId:string;
  album:AlbumData;
  tracks:TrackData[];


  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }


  //TODO: inject spotifyService and use it to get the album data and the tracks for the album
  //when the album page is activated, sends requests to Express to get data to populate the appropriate fields
  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id');
   
    this.spotifyService.getAlbum(this.albumId).then((data) => {
      this.album = data;
    })


    this.spotifyService.getTracksForAlbum(this.albumId).then((data) => {
      this.tracks = data;
    })
  }


}
