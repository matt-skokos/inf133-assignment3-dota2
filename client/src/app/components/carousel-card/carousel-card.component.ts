import { Component, OnInit, Input } from '@angular/core';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.css'],
  standalone: false
})
export class CarouselCardComponent implements OnInit {
  @Input() resource: ResourceData;

  constructor() { }

  ngOnInit() {
  }

  resourceURL(): string {
    if (!this.resource) return '#';
    switch (this.resource.category) {
      case 'artist':
        return `/artist/${this.resource.id}`;
      case 'album':
        return `/album/${this.resource.id}`;
      case 'track':
        return `/track/${this.resource.id}`;
      default:
        return '#';
    }
  }
}
