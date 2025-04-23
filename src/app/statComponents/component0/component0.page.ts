import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component0',
  templateUrl: './component0.page.html',
  styleUrls: ['./component0.page.scss'],
})
export class Component0Page implements OnInit {


  constructor() { }
  @Input() nbr = "1"
  @Input() colSize = "10"
  @Input() bottom = ""
  @Input() marginGrid = ""
  @Input() paddingText7 = ""
  @Input() paddingText9 = "0 0 0 30px"
  @Input() colorText8 = "darkgreen"
  @Input() iconName = ""
  @Input() showColNbr = false
  @Input() showAvatar = true
  @Input() showIcon = false
  @Input() showText2 = true
  @Input() showText3 = false
  @Input() showText4 = false
  @Input() showText5 = false
  @Input() showText6 = false
  @Input() showText7 = false
  @Input() showText8 = false
  @Input() showText9 = false
  @Input() showCheck1 = false
  @Input() showCheck2 = false
  @Input() text1 = "Welecome Fernand"
  @Input() text4 = "1500"
  @Input() text5 = "2000"
  @Input() text6 = "2500"
  @Input() text8 = "Disponible"
  @Input() text9 = "Indisponible"
  ngOnInit() {
  }


  onCheckboxChange(event: any) {
    const isChecked = event.detail.checked;
    console.log('Checkbox clicked! Checked:', isChecked);
    // Faites quelque chose en fonction de l'état du checkbox
  }
}
