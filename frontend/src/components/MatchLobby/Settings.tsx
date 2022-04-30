import { match } from "assert";
import styled from "styled-components";
import { Match } from "../../types/types";
import { H2 } from "../common";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Settings = ({ match }: { match: Match }) => {
  return (
    <div>
      <Header>
        <H2>Einstellungen</H2>
      </Header>
      <ul>
        <li>
          Title: {match.title}
          Hat Passwort: {match.hasPassword ? 'Ja' : 'Nein'}
        </li>
      </ul>
    </div>
  )
}

export default Settings;
