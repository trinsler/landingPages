// Profile data and configuration
export const defaultProfileData = {
  userName: 'Max Mustermann',
  rating: '4.9',
  userInfo: 'Schüler • 89 Aufträge erledigt',
  skills: ['Einkaufen', 'Kochen', 'Technik-Hilfe'],
  personalFields: [
    { label: 'E-Mail', value: 'max.mustermann@email.de' },
    { label: 'Telefon', value: '+49 123 456 789' },
    { label: 'Postleitzahl', value: '12345 Musterstadt' },
    { label: 'Mitglied seit', value: 'Januar 2024' }
  ],
  aboutText: 'Freundlicher Schüler, der gerne älteren Menschen hilft. Besonders gut in Technik-Fragen und beim Einkaufen.'
}

export const availabilitySchedule = [
  { day: 'Mo', hours: '16-20' },
  { day: 'Di', hours: '14-18' },
  { day: 'Mi', hours: '16-20' },
  { day: 'Do', hours: '15-19' },
  { day: 'Fr', hours: '16-20' },
  { day: 'Sa', hours: '10-18' },
  { day: 'So', hours: '12-16' }
]

export const verificationItems = [
  { name: 'Ausweis', verified: true },
  { name: 'Telefon', verified: true },
  { name: 'E-Mail', verified: true }
]

export const idInstructions = [
  { label: 'Benötigt', text: 'Vorder- und Rückseite' },
  { label: 'Sichtbar', text: 'Name, Foto, Unterschrift' },
  { label: 'Geschwärzt', text: 'Ausweisnummer, Behördenkennzahl' }
]