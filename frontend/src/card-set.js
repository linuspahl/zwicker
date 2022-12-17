import { ReactComponent as AceClubs } from './images/cards/ace-clubs.svg';
import { ReactComponent as AceDiamonds } from './images/cards/ace-diamonds.svg';
import { ReactComponent as AceHearts } from './images/cards/ace-hearts.svg';
import { ReactComponent as AceSpades } from './images/cards/ace-spades.svg';
import { ReactComponent as TwoClubs } from './images/cards/2-clubs.svg';
import { ReactComponent as TwoDiamonds } from './images/cards/2-diamonds.svg';
import { ReactComponent as TwoHearts } from './images/cards/2-hearts.svg';
import { ReactComponent as TwoSpades } from './images/cards/2-spades.svg';
import { ReactComponent as ThreeClubs } from './images/cards/3-clubs.svg';
import { ReactComponent as ThreeDiamonds } from './images/cards/3-diamonds.svg';
import { ReactComponent as ThreeHearts } from './images/cards/3-hearts.svg';
import { ReactComponent as ThreeSpades } from './images/cards/3-spades.svg';
import { ReactComponent as FourClubs } from './images/cards/4-clubs.svg';
import { ReactComponent as FourDiamonds } from './images/cards/4-diamonds.svg';
import { ReactComponent as FourHearts } from './images/cards/4-hearts.svg';
import { ReactComponent as FourSpades } from './images/cards/4-spades.svg';
import { ReactComponent as FiveClubs } from './images/cards/5-clubs.svg';
import { ReactComponent as FiveDiamonds } from './images/cards/5-diamonds.svg';
import { ReactComponent as FiveHearts } from './images/cards/5-hearts.svg';
import { ReactComponent as FiveSpades } from './images/cards/5-spades.svg';
import { ReactComponent as SixClubs } from './images/cards/6-clubs.svg';
import { ReactComponent as SixDiamonds } from './images/cards/6-diamonds.svg';
import { ReactComponent as SixHearts } from './images/cards/6-hearts.svg';
import { ReactComponent as SixSpades } from './images/cards/6-spades.svg';
import { ReactComponent as SevenClubs } from './images/cards/7-clubs.svg';
import { ReactComponent as SevenDiamonds } from './images/cards/7-diamonds.svg';
import { ReactComponent as SevenHearts } from './images/cards/7-hearts.svg';
import { ReactComponent as SevenSpades } from './images/cards/7-spades.svg';
import { ReactComponent as EightClubs } from './images/cards/8-clubs.svg';
import { ReactComponent as EightDiamonds } from './images/cards/8-diamonds.svg';
import { ReactComponent as EightHearts } from './images/cards/8-hearts.svg';
import { ReactComponent as EightSpades } from './images/cards/8-spades.svg';
import { ReactComponent as NineClubs } from './images/cards/9-clubs.svg';
import { ReactComponent as NineDiamonds } from './images/cards/9-diamonds.svg';
import { ReactComponent as NineHearts } from './images/cards/9-hearts.svg';
import { ReactComponent as NineSpades } from './images/cards/9-spades.svg';
import { ReactComponent as TenClubs } from './images/cards/10-clubs.svg';
import { ReactComponent as TenDiamonds } from './images/cards/10-diamonds.svg';
import { ReactComponent as TenHearts } from './images/cards/10-hearts.svg';
import { ReactComponent as TenSpades } from './images/cards/10-spades.svg';
import { ReactComponent as QueenClubs } from './images/cards/queen-clubs.svg';
import { ReactComponent as QueenDiamonds } from './images/cards/queen-diamonds.svg';
import { ReactComponent as QueenHearts } from './images/cards/queen-hearts.svg';
import { ReactComponent as QueenSpades } from './images/cards/queen-spades.svg';
import { ReactComponent as KingClubs } from './images/cards/king-clubs.svg';
import { ReactComponent as KingDiamonds } from './images/cards/king-diamonds.svg';
import { ReactComponent as KingHearts } from './images/cards/king-hearts.svg';
import { ReactComponent as KingSpades } from './images/cards/king-spades.svg';

const cardBase = {
  ace: { value: 11, alternativeValue: 1 },
  two: { value: 2 },
  three: { value: 3 },
  four: { value: 4 },
  five: { value: 5 },
  six: { value: 6 },
  seven: { value: 7 },
  eight: { value: 8 },
  nine: { value: 9 },
  ten: { value: 10 },
  jack: { value: 12, alternativeValue: 2 },
  queen: { value: 13, alternativeValue: 3 },
  king: { value: 14, alternativeValue: 4 },
};

const cards = {
  'ace-clubs': { ...cardBase.ace, image: AceClubs },
  'ace-diamonds': { ...cardBase.ace, image: AceDiamonds },
  'ace-hearts': { ...cardBase.ace, image: AceHearts },
  'ace-spades': { ...cardBase.ace, image: AceSpades },
  'two-clubs': { ...cardBase.two, image: TwoClubs },
  'two-diamonds': { ...cardBase.two, image: TwoDiamonds },
  'two-hearts': { ...cardBase.two, image: TwoHearts },
  'two-spades': { ...cardBase.two, image: TwoSpades },
  'three-clubs': { ...cardBase.three, image: ThreeClubs },
  'three-diamonds': { ...cardBase.three, image: ThreeDiamonds },
  'three-hearts': { ...cardBase.three, image: ThreeHearts },
  'three-spades': { ...cardBase.three, image: ThreeSpades },
  'four-clubs': { ...cardBase.four, image: FourClubs },
  'four-diamonds': { ...cardBase.four, image: FourDiamonds },
  'four-hearts': { ...cardBase.four, image: FourHearts },
  'four-spades': { ...cardBase.four, image: FourSpades },
  'five-clubs': { ...cardBase.five, image: FiveClubs },
  'five-diamonds': { ...cardBase.five, image: FiveDiamonds },
  'five-hearts': { ...cardBase.five, image: FiveHearts },
  'five-spades': { ...cardBase.five, image: FiveSpades },
  'six-clubs': { ...cardBase.six, image: SixClubs },
  'six-diamonds': { ...cardBase.six, image: SixDiamonds },
  'six-hearts': { ...cardBase.six, image: SixHearts },
  'six-spades': { ...cardBase.six, image: SixSpades },
  'seven-clubs': { ...cardBase.seven, image: SevenClubs },
  'seven-diamonds': { ...cardBase.seven, image: SevenDiamonds },
  'seven-hearts': { ...cardBase.seven, image: SevenHearts },
  'seven-spades': { ...cardBase.seven, image: SevenSpades },
  'eight-clubs': { ...cardBase.eight, image: EightClubs },
  'eight-diamonds': { ...cardBase.eight, image: EightDiamonds },
  'eight-hearts': { ...cardBase.eight, image: EightHearts },
  'eight-spades': { ...cardBase.eight, image: EightSpades },
  'nine-clubs': { ...cardBase.nine, image: NineClubs },
  'nine-diamonds': { ...cardBase.nine, image: NineDiamonds },
  'nine-hearts': { ...cardBase.nine, image: NineHearts },
  'nine-spades': { ...cardBase.nine, image: NineSpades },
  'ten-clubs': { ...cardBase.ten, image: TenClubs },
  'ten-diamonds': { ...cardBase.ten, image: TenDiamonds },
  'ten-hearts': { ...cardBase.ten, image: TenHearts },
  'ten-spades': { ...cardBase.ten, image: TenSpades },
  'queen-clubs': { ...cardBase.queen, image: QueenClubs },
  'queen-diamonds': { ...cardBase.queen, image: QueenDiamonds },
  'queen-hearts': { ...cardBase.queen, image: QueenHearts },
  'queen-spades': { ...cardBase.queen, image: QueenSpades },
  'king-clubs': { ...cardBase.king, image: KingClubs },
  'king-diamonds': { ...cardBase.king, image: KingDiamonds },
  'king-hearts': { ...cardBase.king, image: KingHearts },
  'king-spades': { ...cardBase.king, image: KingSpades },
  jack15: { value: 15, image: KingSpades },
  jack20: { value: 20, image: KingSpades },
  jack30: { value: 30, image: KingSpades },
  jack35: { value: 35, image: KingSpades },
};

export default cards;
