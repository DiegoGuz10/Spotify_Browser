import { Component, OnInit, Input } from '@angular/core';
import { TrackData } from '../../data/track-data';
import { SearchComponent } from '../search/search.component';
//import {searchPerformed} from "../../search.component";

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
	@Input() tracks:TrackData[];
	@Input() hideArtist:boolean = false;
	@Input() hideAlbum:boolean = false;

  constructor() { }
  ngOnInit() {
  }

}
