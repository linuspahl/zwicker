import { createGlobalStyle } from 'styled-components';

import BadScriptFont from './BadScript-Regular.ttf';
import TavirajFont from './Taviraj-ExtraLight.ttf';
import MuktaVaaniFont from './MuktaVaani-Regular.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: "BadScript";
    src: local("BadScript"), url(${BadScriptFont}) format("truetype");
  }
  @font-face {
    font-family: "MuktaVaani";
    src: local("MuktaVaani"), url(${MuktaVaaniFont}) format("truetype");
  }
  @font-face {
    font-family: "Taviraj";
    src: local("Taviraj"), url(${TavirajFont}) format("truetype");
  }
`;
