import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent implements OnInit {
  @Input() imageSrc: string = '../../../assets/images/fastFood.png';
  @Input() titre: string = 'Titre par défaut';
  @Input() description: string = 'Description par défaut';
  @Input() boutonLabel: string = 'Continuer';
  @Input() scale: string = '1';
  @Input() imageWidth: string = '250px';

  constructor() {}

  ngOnInit() {}
}
