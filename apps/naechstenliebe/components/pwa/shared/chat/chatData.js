export const allChatsData = [
  {
    id: 1,
    name: 'Maria Schmidt',
    avatar: 'user',
    lastMessage: 'Vielen Dank für deine Hilfe! Das war wirklich super 🙏',
    lastMessageTime: new Date(Date.now() - 5 * 60000),
    unreadCount: 2,
    isOnline: true
  },
 
  {
    id: 3,
    name: 'Anna Fischer',
    avatar: 'user',
    lastMessage: 'Passt morgen Nachmittag für dich? Um 15:00 Uhr vielleicht?',
    lastMessageTime: new Date(Date.now() - 60 * 60000),
    unreadCount: 1,
    isOnline: false
  },
  {
    id: 4,
    name: 'Klaus Müller',
    avatar: 'user',
    lastMessage: 'Alles erledigt, danke für die Unterstützung!',
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60000),
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 5,
    name: 'Sabine Wagner',
    avatar: 'user',
    lastMessage: 'Super, vielen Dank! Die Einkäufe sind perfekt.',
    lastMessageTime: new Date(Date.now() - 2 * 24 * 60 * 60000),
    unreadCount: 0,
    isOnline: false
  }
]

export const archivedChatsData = [
  {
    id: 8,
    name: 'Helga Schmidt',
    avatar: 'user',
    lastMessage: 'Vielen Dank für deine Hilfe letzten Monat!',
    lastMessageTime: new Date(Date.now() - 30 * 24 * 60 * 60000),
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 9,
    name: 'Werner Braun',
    avatar: 'user',
    lastMessage: 'Alles gut gelaufen, danke nochmal!',
    lastMessageTime: new Date(Date.now() - 45 * 24 * 60 * 60000),
    unreadCount: 0,
    isOnline: false
  }
]