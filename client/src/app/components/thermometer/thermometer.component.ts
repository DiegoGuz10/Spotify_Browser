import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //TODO: define Input fields and bind them to the template.

  //Creates Input fields for the thermometer component to display the type of feature, what percent it is,
  //and the hex color calculated through the track_feature.
  @Input() featureType:string = "blank";
  @Input() percentString:string = "0%";
  @Input() color:string = "#ffffff";

  constructor() { }

  ngOnInit() {
  }

}
