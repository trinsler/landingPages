<template>
  <div class="about-screen">
    <div class="about-content">
      <h1 class="about-title">{{ t('about', globalTranslations) }}</h1>
      
      <div class="about-sections">
        <section class="about-section">
          <h2 class="section-title">{{ tLocal('gameInstructions') }}</h2>
          <div class="section-content">
            <p>{{ tLocal('imagioDescription1') }}</p>
            <p>{{ tLocal('imagioDescription2') }}</p>
            <p>{{ tLocal('imagioDescription3') }}</p>
            <p>{{ tLocal('imagioDescription4') }}</p>
            <p>{{ tLocal('imagioDescription5') }}</p>
            <p>{{ tLocal('imagioDescription6') }}</p>
          </div>
        </section>
        
        <section class="about-section">
          <h2 class="section-title">{{ tLocal('privacyTitle') }}</h2>
          <div class="section-content">
            <p>{{ tLocal('privacyIntro') }}</p>
          </div>
        </section>
        
        <section class="about-section">
          <h2 class="section-title">{{ tLocal('gdprTitle') }}</h2>
          <div class="section-content">
            <p>{{ tLocal('gdprIntro') }}</p>
            <p>{{ tLocal('gdvrPurpose') }}</p>
            
            <div class="gdpr-sections">
              <div class="gdpr-section">
                <h4>1. {{ tLocal('section1Title') }}</h4>
                <p>{{ tLocal('section1Content') }}</p>
              </div>
              
              <div class="gdpr-section">
                <h4>2. {{ tLocal('section2Title') }}</h4>
                <p>{{ tLocal('section2Content') }}</p>
              </div>
              
              <div class="gdpr-section">
                <h4>3. {{ tLocal('section3Title') }}</h4>
                <p>{{ tLocal('section3Content') }}</p>
              </div>
              
              <div class="gdpr-section">
                <h4>4. {{ tLocal('section4Title') }}</h4>
                <p>{{ tLocal('section4Content') }}</p>
              </div>
              
              <div class="gdpr-section">
                <h4>5. {{ tLocal('section5Title') }}</h4>
                <p>{{ tLocal('section5Content') }}</p>
              </div>
              
              <div class="gdpr-section">
                <h4>6. {{ tLocal('section6Title') }}</h4>
                <p>{{ tLocal('section6Content') }}</p>
              </div>
              
              <div class="gdpr-section">
                <h4>7. {{ tLocal('section7Title') }}</h4>
                <p>{{ tLocal('section7Content') }}</p>
              </div>
              
              <div class="gdpr-section">
                <h4>8. {{ tLocal('section8Title') }}</h4>
                <p>{{ tLocal('section8Content') }}</p>
              </div>
              
              <div class="gdpr-section">
                <h4>9. {{ tLocal('section9Title') }}</h4>
                <div class="contact-info">
                  <p><strong>{{ tLocal('section9Responsible') }}:</strong></p>
                  <p>{{ tLocal('section9Company') }}</p>
                  <p>{{ tLocal('section9Address') }}</p>
                  <p>{{ tLocal('section9City') }}</p>
                  
                  <p class="contact-spacer"><strong>{{ tLocal('section9DataProtection') }}:</strong></p>
                  <p>{{ tLocal('section9DPOName') }}</p>
                  <p>{{ tLocal('section9DPOAddress') }}</p>
                  <p>{{ tLocal('section9DPOCity') }}</p>
                  <p>{{ tLocal('section9DPOEmail') }}</p>
                </div>
              </div>
              
              <div class="gdpr-section">
                <h4>10. {{ tLocal('section10Title') }}</h4>
                <p>{{ tLocal('section10Content') }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <div class="back-section">
        <button @click="goBack" class="back-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {{ tLocal('backToMenu') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLanguage, globalTranslations } from '~/composables/useLanguage'

const router = useRouter()
const { t, currentLanguage } = useLanguage()

// Local translations for this page
const localTranslations = {
  en: {
    gameInstructions: 'Game Instructions',
    imagioDescription1: 'After the game has been started, questions must be answered in a spontaneous manner.',
    imagioDescription2: 'Pictures or videos are displayed which relate to the questions. For each question you have 45 seconds time.',
    imagioDescription3: 'The voices are recorded and then evaluated later.',
    imagioDescription4: 'The answers should be in English.',
    imagioDescription5: 'The evaluation is done via the feedback portal, by entering the displayed game code. Please remember the game code.',
    imagioDescription6: 'In the feedback portal, the most frequently or most important words have to be placed in a rank order, according to the most important meaning.',
    
    privacyTitle: 'Privacy Information',
    privacyIntro: 'By using the game Imagio and all functions of this website, you accept the terms of use of sumo technologies gmbh. Any liability by sumo technologies gmbh is excluded.',
    
    gdprTitle: 'Information on the processing of personal data',
    gdprIntro: 'With May 25, 2018, the Regulation of the European Parliament and of the Council of April 27, 2016 on the protection of natural persons with regard to the processing of personal data, on the free movement of such data and the repeal of Directive 95/46/EC (General Data Protection Regulation, GDPR) is directly applicable in all EU Member States.',
    
    gdvrPurpose: 'The GDPR provides, among other things, for expanded information obligations regarding the processing of personal data. In fulfillment of these obligations (in particular Article 13 GDPR), we hereby inform you about the processing of your personal data carried out by us.',
    
    section1Title: 'What personal data (short "data") are processed?',
    section1Content: 'Audio files recorded by "players" and converted to text files by means of software.',
    
    section2Title: 'For what purpose are the data processed?',
    section2Content: 'In the course of using "Imagio", spoken input related to questions (answers, opinions, feedback) is converted into written text and the most frequently mentioned words and phrases are listed. This listing allows a comparison with the "tags" associated with the respective questions and thus a statement about the degree of agreement. This allows answers to be automatically evaluated and compared in terms of content. Since technical factors (microphone quality, technical settings, ...) and personal factors (pronunciation, volume, background noise, technical terminology, ...) vary in speech recognition, there are corresponding deviations between the actually spoken text and the recognized and compared text when converting to text.',
    
    section3Title: 'On what legal basis are the data processed?',
    section3Content: '✓ Art. 6 Abs. 1 lit. a GDPR - The affected player has given his/her consent to the processing of personal data concerning him/her for one or more specific purposes (by checking the corresponding option)',
    
    section4Title: 'Does profiling take place in the course of processing?',
    section4Content: 'No',
    
    section5Title: 'Are the data transmitted in whole or in part to other persons/institutions?',
    section5Content: 'Yes, your data are transmitted to the following recipients in the course of processing for the purpose mentioned above: The audio files are processed by Google (specifically: converted into text files)',
    
    section6Title: 'Are the recipients mentioned under point 5 located outside the EU/EEA or is it an international organization?',
    section6Content: 'Yes',
    
    section7Title: 'How long are the data stored or according to which criteria is the duration of storage determined?',
    section7Content: 'Audio files are deleted in agreement with the player or the player\'s organization.',
    
    section8Title: 'What rights do you have as an affected person?',
    section8Content: 'You basically have the rights to information, correction, deletion, restriction, data portability and revocation. To exercise these rights, please contact our data protection officer (contact details see point 9). In addition, you have the right to file any complaints with the data protection authority.',
    
    section9Title: 'Contact details of the responsible parties and their data protection officer:',
    section9Responsible: 'Responsible',
    section9Company: 'Sumo Technologies GmbH',
    section9Address: 'Lindengasse 56',
    section9City: '1070 Vienna',
    
    section9DataProtection: 'Data Protection Officer',
    section9DPOName: 'Mariusz Gasinski',
    section9DPOAddress: 'Lindengasse 56',
    section9DPOCity: '1070 Vienna',
    section9DPOEmail: 'mariusz@sumo-technologies.com',
    
    section10Title: 'Liability Exclusion',
    section10Content: 'Imagio by sumo technologies gmbh, Vienna. By using the game Imagio and all functions of this website, you accept the terms of use of sumo technologies gmbh. Any liability by sumo technologies gmbh is excluded. Any claim for damages against sumo technologies gmbh is excluded.',
    
    backToMenu: 'Back to Menu'
  },
  de: {
    gameInstructions: 'Spielanleitung',
    imagioDescription1: 'Nachdem das Spiel gestartet wurde, müssen Fragen spontan beantwortet werden.',
    imagioDescription2: 'Es werden Bilder oder Videos angezeigt, die sich auf die Fragen beziehen. Für jede Frage haben Sie 45 Sekunden Zeit.',
    imagioDescription3: 'Die Stimmen werden aufgezeichnet und später ausgewertet.',
    imagioDescription4: 'Die Antworten sollten auf Englisch erfolgen.',
    imagioDescription5: 'Die Auswertung erfolgt über das Feedback-Portal durch Eingabe des angezeigten Spielcodes. Merken Sie sich bitte den Spielcode.',
    imagioDescription6: 'Im Feedback-Portal müssen die häufigsten oder wichtigsten Wörter nach der wichtigsten Bedeutung in eine Rangordnung gebracht werden.',
    
    privacyTitle: 'Datenschutzinformationen',
    privacyIntro: 'Durch die Nutzung des Spiels Imagio und aller Funktionen dieser Website akzeptieren Sie die Nutzungsbedingungen der sumo technologies gmbh. Jegliche Haftung durch die sumo technologies gmbh ist ausgeschlossen.',
    
    gdprTitle: 'Informationen zur Verarbeitung personenbezogener Daten',
    gdprIntro: 'Mit dem 25. Mai 2018 ist die Verordnung des Europäischen Parlaments und des Rates vom 27. April 2016 zum Schutz natürlicher Personen bei der Verarbeitung personenbezogener Daten, zum freien Datenverkehr und zur Aufhebung der Richtlinie 95/46/EG (Datenschutz-Grundverordnung, DSGVO) in allen EU-Mitgliedstaaten unmittelbar anwendbar.',
    gdvrPurpose: 'Die DSGVO sieht unter anderem erweiterte Informationspflichten bezüglich der Verarbeitung personenbezogener Daten vor. In Erfüllung dieser Verpflichtungen (insbesondere Art. 13 DSGVO) informieren wir Sie hiermit über die von uns durchgeführte Verarbeitung Ihrer personenbezogenen Daten.',
    
    section1Title: 'Welche personenbezogenen Daten (kurz "Daten") werden verarbeitet?',
    section1Content: 'Von "Spielern" aufgenommene Audiodateien und mittels Software in Textdateien umgewandelt.',
    
    section2Title: 'Zu welchem Zweck werden die Daten verarbeitet?',
    section2Content: 'Im Rahmen der Nutzung von "Imagio" werden gesprochene Eingaben zu Fragen (Antworten, Meinungen, Feedback) in schriftlichen Text umgewandelt und die am häufigsten erwähnten Wörter und Phrasen aufgelistet.',
    
    section3Title: 'Auf welcher Rechtsgrundlage werden die Daten verarbeitet?',
    section3Content: '✓ Art. 6 Abs. 1 lit. a DSGVO - Der betroffene Spieler hat seine Einwilligung zur Verarbeitung der ihn betreffenden personenbezogenen Daten für einen oder mehrere bestimmte Zwecke gegeben (durch Ankreuzen der entsprechenden Option)',
    
    section4Title: 'Findet im Rahmen der Verarbeitung ein Profiling statt?',
    section4Content: 'Nein',
    
    section5Title: 'Werden die Daten ganz oder teilweise an andere Personen/Institutionen übermittelt?',
    section5Content: 'Ja, Ihre Daten werden im Rahmen der Verarbeitung für den oben genannten Zweck an folgende Empfänger übermittelt: Die Audiodateien werden von Google verarbeitet (konkret: in Textdateien umgewandelt)',
    
    section6Title: 'Befinden sich die unter Punkt 5 genannten Empfänger außerhalb der EU/des EWR oder handelt es sich um eine internationale Organisation?',
    section6Content: 'Ja',
    
    section7Title: 'Wie lange werden die Daten gespeichert bzw. nach welchen Kriterien wird die Speicherdauer bestimmt?',
    section7Content: 'Audiodateien werden in Absprache mit dem Spieler oder der Organisation des Spielers gelöscht.',
    
    section8Title: 'Welche Rechte haben Sie als betroffene Person?',
    section8Content: 'Sie haben grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerruf. Zur Ausübung dieser Rechte wenden Sie sich bitte an unseren Datenschutzbeauftragten (Kontaktdaten siehe Punkt 9). Darüber hinaus haben Sie das Recht, etwaige Beschwerden bei der Datenschutzbehörde einzureichen.',
    
    section9Title: 'Kontaktdaten der Verantwortlichen und ihres Datenschutzbeauftragten:',
    section9Responsible: 'Verantwortlicher',
    section9Company: 'Sumo Technologies GmbH',
    section9Address: 'Lindengasse 56',
    section9City: '1070 Wien',
    
    section9DataProtection: 'Datenschutzbeauftragter',
    section9DPOName: 'Mariusz Gasinski',
    section9DPOAddress: 'Lindengasse 56',
    section9DPOCity: '1070 Wien',
    section9DPOEmail: 'mariusz@sumo-technologies.com',
    
    section10Title: 'Haftungsausschluss',
    section10Content: 'Imagio von sumo technologies gmbh, Wien. Durch die Nutzung des Spiels Imagio und aller Funktionen dieser Website akzeptieren Sie die Nutzungsbedingungen der sumo technologies gmbh. Jegliche Haftung durch die sumo technologies gmbh ist ausgeschlossen. Jeglicher Schadensersatzanspruch gegen die sumo technologies gmbh ist ausgeschlossen.',
    
    backToMenu: 'Zurück zum Menü'
  }
}

const tLocal = (key: string) => {
  return localTranslations[currentLanguage.value]?.[key] || localTranslations['en']?.[key] || key
}

// Methods
const goBack = () => {
  router.push('/menu')
}
</script>

<style scoped>
.about-screen {
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: 900px;
}

.about-title {
  color: #1f2937;
  font-size: 2.5rem;
  font-weight: 600;
  text-align: center;
  margin: 1rem 0;
}

.about-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-section {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 2px solid #e5e7eb;
  border-left: 4px solid #0097b2;
}

.section-title {
  color: #0097b2;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.section-content {
  color: #4b5563;
  line-height: 1.6;
}

.section-content p {
  margin-bottom: 1rem;
}

.section-content p:last-child {
  margin-bottom: 0;
}

/* GDPR Sections */
.gdpr-sections {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
}

.gdpr-section {
  background-color: #f9fafb;
  padding: 1.25rem;
  border-radius: 8px;
  border-left: 3px solid #0097b2;
}

.gdpr-section h4 {
  color: #374151;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.gdpr-section p {
  margin: 0 0 0.75rem 0;
  line-height: 1.6;
}

.gdpr-section p:last-child {
  margin-bottom: 0;
}

.contact-info {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  margin-top: 0.75rem;
}

.contact-info p {
  margin: 0.25rem 0;
}

.contact-spacer {
  margin-top: 1rem !important;
}

.contact-info strong {
  color: #374151;
}

/* Back Button */
.back-section {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #6b7280;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background-color: #4b5563;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .about-screen {
    min-height: calc(100vh - 56px);
    padding: 1rem;
  }
  
  .about-content {
    gap: 2rem;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .about-section {
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 1.25rem;
  }
  
  .gdpr-section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 1.75rem;
  }
  
  .about-section {
    padding: 1rem;
  }
  
  .gdpr-section {
    padding: 0.75rem;
  }
}
</style>