// @ts-nocheck
import React from "react";
import {ThemedMarkdown} from "../../components/markdown/ThemedMarkdown";

export class CookieDefaultComponents{

  static getCookieComponentConsent(){
    return <ThemedMarkdown markdown={`
### Wir brauchen deine Zustimmung

Wir verwenden Cookies und andere Technologien, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website zu analysieren. Außerdem werden Informationen zu deiner Verwendung unserer Website an unsere Partner für soziale Medien, Werbung und Analysen wie Google, Meta und andere in unserer Datenschutzerklärung genannte Unternehmen übermittelt. Unsere Partner führen diese Informationen möglicherweise mit weiteren Daten zusammen, die Sie dir bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung der Dienste gesammelt haben.

Du willigst mit dem Klick auf „Alles akzeptieren“ ein, dass die hier unter „Details“ beschriebenen Cookies und anderen Technologien auf dem von deinem verwendeten Endgerät gesetzt und infolgedessen personenbezogene Daten verarbeitet werden. Du willigst gem. Art. 49 I DSGVO ein, dass auch Anbieter in Drittstaaten wie in den USA deine Daten verarbeitet. In diesem Fall ist es möglich, dass dortige Behörden deine Daten unbemerkt erlangen. Ausführliche Informationen dazu und über mögliche Datenverarbeitungen gemäß der DSGVO und des TTDSG erhälst du hier unter „Details“ und in unserer „Datenschutzerklärung“. Du kannst deine Einwilligung über den Link "Cookies" am Ende jeder Seite jederzeit widerrufen.
    `}>
    </ThemedMarkdown>
  }

  static getCookieComponentDetails(){
    return null;
  }

  static getCookieComponentAbout(){
    return <ThemedMarkdown>
      {`
Cookies sind kleine Textdateien, die von Webseiten verwendet werden, um die Benutzererfahrung effizienter zu gestalten.

Laut Gesetz können wir Cookies auf deinem Gerät speichern, wenn diese für den Betrieb dieser Seite unbedingt notwendig sind. Für alle anderen Cookie-Typen benötigen wir deine Erlaubnis.

Diese Seite verwendet unterschiedliche Cookie-Typen. Einige Cookies werden von Drittparteien platziert, die auf unseren Seiten erscheinen.

Du kannst deine Einwilligung jederzeit von der Cookie-Erklärung auf unserer Website ändern oder widerrufen.

Erfahre in unserer Datenschutzrichtlinie mehr darüber, wer wir sind, wie du uns kontaktieren kannst und wie wir personenbezogene Daten verarbeiten.
    `}
    </ThemedMarkdown>
  }

}
