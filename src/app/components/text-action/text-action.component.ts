import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-text-action',
  templateUrl: './text-action.component.html',
  styleUrls: ['./text-action.component.scss'],
})
export class TextActionComponent implements OnInit {
  @Input() title = 'Connexion internet indisponible';
  @Input() subtitle = 'verifier votre reseau';
  @Input() buttonText = 'ressayez';
  @Input() marginTop = '0px';
  @Output() chipClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onChipClick() {
    this.chipClick.emit();
  }
}
