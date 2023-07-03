// @ts-nocheck
import React from "react";
import {ThemedMarkdown} from "../../components/markdown/ThemedMarkdown";

export class CookieDefaultComponents{

  static getCookieComponentConsent(){
    return <ThemedMarkdown markdown={`
### Wir brauchen deine Zustimmung

Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, Funktionen für soziale Medien anbieten zu können und die Zugriffe auf unsere Website/App zu analysieren. Außerdem geben wir Informationen zu Ihrer Verwendung unserer Website/App an unsere Partner für soziale Medien, Werbung und Analysen weiter. Unsere Partner führen diese Informationen möglicherweise mit weiteren Daten zusammen, die Sie ihnen bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung der Dienste gesammelt haben.
    `}>
    </ThemedMarkdown>
  }

  static getCookieComponentDetailsNecessary(){
    return <ThemedMarkdown markdown={`
Cookies zur Gewährleistung der Betriebsbereitschaft können nicht deaktiert werden, soweit wir sie verwenden, um unsere Dienste bereitzustellen.

Wir verwenden Cookies für die Bereitstellung unserer Dienste, zum Beispiel, um:
- Deine Identität zu überprüfen, wenn du dich auf der App oder Webseite anmeldest.
- Zu erkennen, ob du ein registrierter Nutzer bist, und um weitere kundenspezifische Funktionen und Dienste bereitzustellen.
- Betrugsprävention und Sicherheit zu gewährleisten.
- Den Offline-Modus zu ermöglichen.
- Funktionen, Dienste und Produkte zu liefern, die für dich von Interesse sein könnten, sofern es sich um unsere Produkte und Dienste handelt.
- Deine Einstellungen, wie zum Beispiel Design, Währung und Sprache, zu berücksichtigen.

Wir verwenden Cookies zudem, um zu verstehen, wie Kunden unsere Services nutzen, damit wir Verbesserungen vornehmen können. Beispielsweise verwenden wir Cookies, um Studien und Diagnosen durchzuführen, um die Inhalte, Produkte und Services von uns zu verbessern und die Leistung unserer Services zu verstehen.
    `}>
    </ThemedMarkdown>
  }

  static getCookieComponentDetailsMarketing(){
    return <ThemedMarkdown markdown={`
Marketing-Cookies werden genutzt, um Besucher über verschiedene Websites zu identifizieren. Ziel und Zweck ist es, den einzelnen Webnutzern Werbung zu zeigen, die für sie relevant und interessant ist, und damit wertvoller für Herausgeber und Drittinserenten.
    `}>
    </ThemedMarkdown>
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
