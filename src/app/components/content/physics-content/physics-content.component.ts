import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-content-pyshical',
  templateUrl: './physics-content.component.html',
  styleUrls: ['./physics-content.component.scss'],
})
export class PhysicsContentComponent implements OnInit {
  title = `Conteúdos referentes a....`;

  longText = `O Shiba Inu é a menor das seis raças spitz originais e distintas de cães
  do Japão. Um cão pequeno e ágil que lida muito bem com terreno montanhoso, o Shiba Inu era
  originalmente criado para a caça .`;

  constructor() {}

  ngOnInit(): void {}
}
