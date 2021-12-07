import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-content-pyshical',
  templateUrl: './content-physics.component.html',
  styleUrls: ['./content-physics.component.scss'],
})
export class ContentPhysicsComponent implements OnInit {
  title = `Conteúdos relacionados à Eletrodinâmica`;

  longText = `O Shiba Inu é a menor das seis raças spitz originais e distintas de cães
  do Japão. Um cão pequeno e ágil que lida muito bem com terreno montanhoso, o Shiba Inu era
  originalmente criado para a caça .`;

  potency = `A potência elétrica pode ser entendida como a velocidade de transformação da energia elétrica em outro tipo de energia em um dado período de tempo. Para se calcular a potência através da eletrodinâmica são utilizadas grandezas físicas como a diferença de potencial (U) e a corrente elétrica (com unidade "i" no S.I.), usualmente chamada de amperagem.`;

  ddp = `Tensão elétrica, ou d.d.p. (diferença de potencial), nada mais é do que o valor do trabalho realizado pela força elétrica sobre uma carga elétrica em uma região com campo elétrico. Assim, a d.d.p., de unidade U no S.I. e medida em volts (V), chamada também de voltagem, é calculada inicialmente pela diferença entre os potenciais elétricos (V) de determinados pontos a e b.`;

  energy = `A energia elétrica é proveniente de energias potenciais. Desta forma, são estabelecidas diferenças de potenciais elétricos permitindo a formação de correntes elétricas para que os fenômenos físicos sejam realizados entre dois pontos. Apesar das formas de energia no S.I. serem postas como Joule, nas contas de luz temos uma unidade diferente para a energia elétrica, o quilowatt-hora (kWh).`;

  constructor() {}

  ngOnInit(): void {}
}
