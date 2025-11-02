// Comprehensive transaction data
export const transactionData = {
  userInfo: {
    name: 'Max Mustermann',
    email: 'max.mustermann@email.de',
    phone: '+49 123 456 789',
    address: '12345 Musterstadt',
    userId: 'HEL-2024-001234',
    taxId: 'DE123456789'
  },
  summary: {
    totalEarned: 342.00,
    totalPaidOut: 242.50,
    currentBalance: 99.50,
    pendingTransactions: 15.00,
    availableBalance: 47.50,
    totalTransactions: 47,
    averagePerTransaction: 7.27
  },
  transactions: [
    // Today's transactions
    { date: '2024-01-15', time: '15:30', description: 'Einkaufen für Martha K.', customer: 'Martha Klein', type: 'earning', amount: 15.00, status: 'completed', orderId: 'ORD-2024-001' },
    { date: '2024-01-15', time: '09:00', description: 'Technik-Hilfe', customer: 'Anna Schmidt', type: 'earning', amount: 25.00, status: 'completed', orderId: 'ORD-2024-002' },
    
    // Yesterday's transactions
    { date: '2024-01-14', time: '18:00', description: 'Kochen für Klaus B.', customer: 'Klaus Braun', type: 'earning', amount: 25.00, status: 'pending', orderId: 'ORD-2024-003' },
    { date: '2024-01-14', time: '14:30', description: 'Einkaufen', customer: 'Maria Weber', type: 'earning', amount: 18.00, status: 'completed', orderId: 'ORD-2024-004' },
    
    // This week
    { date: '2024-01-13', time: '11:00', description: 'Auszahlung', customer: 'Banküberweisung', type: 'payout', amount: -32.50, status: 'completed', transactionId: 'PAY-2024-001' },
    { date: '2024-01-13', time: '10:00', description: 'Technik-Hilfe für Anna S.', customer: 'Anna Schmidt', type: 'earning', amount: 30.00, status: 'completed', orderId: 'ORD-2024-005' },
    { date: '2024-01-12', time: '16:30', description: 'Gartenarbeit', customer: 'Hans Müller', type: 'earning', amount: 22.00, status: 'completed', orderId: 'ORD-2024-006' },
    { date: '2024-01-12', time: '09:15', description: 'Einkaufen', customer: 'Lisa Fischer', type: 'earning', amount: 16.50, status: 'completed', orderId: 'ORD-2024-007' },
    
    // Previous transactions
    { date: '2024-01-10', time: '14:00', description: 'Umzugshilfe', customer: 'Tom Wolf', type: 'earning', amount: 35.00, status: 'completed', orderId: 'ORD-2024-008' },
    { date: '2024-01-09', time: '18:30', description: 'Kochen', customer: 'Elena Russo', type: 'earning', amount: 28.00, status: 'completed', orderId: 'ORD-2024-009' },
    { date: '2024-01-08', time: '13:00', description: 'Betreuung', customer: 'Peter Meier', type: 'earning', amount: 20.00, status: 'completed', orderId: 'ORD-2024-010' },
    { date: '2024-01-07', time: '15:45', description: 'Einkaufen', customer: 'Sabine Wagner', type: 'earning', amount: 14.00, status: 'completed', orderId: 'ORD-2024-011' },
    { date: '2024-01-06', time: '10:30', description: 'Technik-Support', customer: 'Günther Schulz', type: 'earning', amount: 25.00, status: 'completed', orderId: 'ORD-2024-012' },
    { date: '2024-01-05', time: '17:00', description: 'Auszahlung', customer: 'Banküberweisung', type: 'payout', amount: -45.00, status: 'completed', transactionId: 'PAY-2024-002' },
    { date: '2024-01-04', time: '12:00', description: 'Reinigung', customer: 'Claudia Richter', type: 'earning', amount: 32.00, status: 'completed', orderId: 'ORD-2024-013' },
    { date: '2024-01-03', time: '09:30', description: 'Tierbetreuung', customer: 'Markus Lange', type: 'earning', amount: 18.50, status: 'completed', orderId: 'ORD-2024-014' },
    { date: '2024-01-02', time: '14:15', description: 'Gartenarbeit', customer: 'Jutta Hoffmann', type: 'earning', amount: 24.00, status: 'completed', orderId: 'ORD-2024-015' }
  ],
  monthlyStats: [
    { month: 'Januar 2024', earnings: 127.00, payouts: 32.50, transactions: 8 },
    { month: 'Dezember 2023', earnings: 215.00, payouts: 180.00, transactions: 12 },
    { month: 'November 2023', earnings: 189.50, payouts: 150.00, transactions: 10 }
  ]
}

export const createPDFHTML = () => {
  const currentDate = new Date().toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  
  const formatCurrency = (amount) => {
    return `€${amount.toFixed(2).replace('.', ',')}`
  }
  
  const formatTransactionRow = (transaction) => {
    const statusColor = transaction.status === 'completed' ? '#27ae60' : '#f39c12'
    const typeColor = transaction.type === 'earning' ? '#27ae60' : '#e74c3c'
    
    return `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px;">${transaction.date}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px;">${transaction.time}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px;">${transaction.description}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px;">${transaction.customer}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px;">${transaction.orderId || transaction.transactionId || '-'}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px; color: ${typeColor}; font-weight: bold;">${formatCurrency(transaction.amount)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px; text-align: center;">
          <span style="background: ${statusColor}; color: white; padding: 2px 6px; border-radius: 10px; font-size: 10px; font-weight: 600;">
            ${transaction.status === 'completed' ? 'Abgeschlossen' : 'Ausstehend'}
          </span>
        </td>
      </tr>
    `
  }
  
  const monthlyStatsRows = transactionData.monthlyStats.map(stat => `
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px; font-weight: 600;">${stat.month}</td>
      <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px; color: #27ae60; font-weight: bold;">${formatCurrency(stat.earnings)}</td>
      <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px; color: #e74c3c; font-weight: bold;">${formatCurrency(stat.payouts)}</td>
      <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px;">${stat.transactions}</td>
      <td style="padding: 8px; border: 1px solid #ddd; font-size: 12px; font-weight: bold;">${formatCurrency(stat.earnings - stat.payouts)}</td>
    </tr>
  `).join('')
  
  const transactionsRows = transactionData.transactions.map(formatTransactionRow).join('')
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Abrechnungsübersicht - Nächstenliebe</title>
      <style>
        @page { margin: 1cm; }
        body { 
          font-family: Arial, sans-serif; 
          font-size: 12px; 
          line-height: 1.4; 
          color: #333; 
          margin: 0; 
          padding: 20px;
        }
        .header { 
          background: #5F6F55; 
          color: white; 
          padding: 20px; 
          text-align: center; 
          margin-bottom: 30px;
        }
        .section { margin-bottom: 30px; }
        .section-title { 
          font-size: 18px; 
          font-weight: bold; 
          color: #5F6F55; 
          margin-bottom: 15px; 
          border-bottom: 2px solid #5F6F55; 
          padding-bottom: 5px;
        }
        .summary-grid { 
          display: grid; 
          grid-template-columns: repeat(3, 1fr); 
          gap: 15px; 
          margin-bottom: 20px;
        }
        .summary-item { 
          background: #f8f9fa; 
          padding: 15px; 
          border-radius: 8px; 
          text-align: center; 
          border: 1px solid #dee2e6;
        }
        .summary-amount { 
          font-size: 24px; 
          font-weight: bold; 
          color: #474747; 
          margin-bottom: 5px;
        }
        .summary-label { 
          font-size: 11px; 
          color: #8F8B82; 
          text-transform: uppercase;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-bottom: 20px;
        }
        th { 
          background: #5F6F55; 
          color: white; 
          padding: 10px; 
          text-align: left; 
          font-weight: bold; 
          font-size: 12px;
        }
        td { padding: 8px; border: 1px solid #ddd; font-size: 12px; }
        .positive { color: #27ae60; font-weight: bold; }
        .negative { color: #e74c3c; font-weight: bold; }
        .footer { 
          margin-top: 40px; 
          padding-top: 20px; 
          border-top: 1px solid #ddd; 
          font-size: 10px; 
          color: #8F8B82; 
          text-align: center;
        }
        .user-info { 
          background: #f8f9fa; 
          padding: 15px; 
          border-radius: 8px; 
          margin-bottom: 20px;
        }
        .user-info-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
        .user-info-label { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 28px;">Abrechnungsübersicht</h1>
        <p style="margin: 5px 0 0 0; font-size: 14px;">Nächstenliebe Helfer-Plattform</p>
        <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.9;">Erstellt am: ${currentDate}</p>
      </div>

      <div class="section">
        <div class="section-title">Benutzerinformationen</div>
        <div class="user-info">
          <div class="user-info-row">
            <span class="user-info-label">Name:</span>
            <span>${transactionData.userInfo.name}</span>
          </div>
          <div class="user-info-row">
            <span class="user-info-label">Benutzer-ID:</span>
            <span>${transactionData.userInfo.userId}</span>
          </div>
          <div class="user-info-row">
            <span class="user-info-label">E-Mail:</span>
            <span>${transactionData.userInfo.email}</span>
          </div>
          <div class="user-info-row">
            <span class="user-info-label">Telefon:</span>
            <span>${transactionData.userInfo.phone}</span>
          </div>
          <div class="user-info-row">
            <span class="user-info-label">Adresse:</span>
            <span>${transactionData.userInfo.address}</span>
          </div>
          <div class="user-info-row">
            <span class="user-info-label">Steuer-ID:</span>
            <span>${transactionData.userInfo.taxId}</span>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Zusammenfassung</div>
        <div class="summary-grid">
          <div class="summary-item">
            <div class="summary-amount">${formatCurrency(transactionData.summary.totalEarned)}</div>
            <div class="summary-label">Gesamt verdient</div>
          </div>
          <div class="summary-item">
            <div class="summary-amount">${formatCurrency(transactionData.summary.totalPaidOut)}</div>
            <div class="summary-label">Ausgezahlt</div>
          </div>
          <div class="summary-item">
            <div class="summary-amount">${formatCurrency(transactionData.summary.availableBalance)}</div>
            <div class="summary-label">Verfügbares Guthaben</div>
          </div>
          <div class="summary-item">
            <div class="summary-amount">${formatCurrency(transactionData.summary.pendingTransactions)}</div>
            <div class="summary-label">Ausstehend</div>
          </div>
          <div class="summary-item">
            <div class="summary-amount">${transactionData.summary.totalTransactions}</div>
            <div class="summary-label">Gesamttransaktionen</div>
          </div>
          <div class="summary-item">
            <div class="summary-amount">${formatCurrency(transactionData.summary.averagePerTransaction)}</div>
            <div class="summary-label">Durchschnitt/Transaktion</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Monatliche Statistiken</div>
        <table>
          <thead>
            <tr>
              <th>Monat</th>
              <th>Verdient</th>
              <th>Ausgezahlt</th>
              <th>Transaktionen</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            ${monthlyStatsRows}
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">Alle Transaktionen</div>
        <table>
          <thead>
            <tr>
              <th>Datum</th>
              <th>Uhrzeit</th>
              <th>Beschreibung</th>
              <th>Kunde</th>
              <th>Auftrags-ID</th>
              <th>Betrag</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${transactionsRows}
          </tbody>
        </table>
      </div>

      <div class="footer">
        <p><strong>Nächstenliebe GmbH</strong></p>
        <p>Musterstraße 123 • 12345 Musterstadt</p>
        <p>Telefon: +49 123 456 789 • E-Mail: support@naechstenliebe.de</p>
        <p>Web: www.naechstenliebe.de • Steuer-Nr: DE123456789</p>
        <p style="margin-top: 15px;">Dies ist eine automatisch erstellte Abrechnung.</p>
        <p>Bei Fragen wenden Sie sich bitte an unseren Support.</p>
      </div>
    </body>
    </html>
  `
}

export const generatePDFDocument = () => {
  // Create the HTML content for the PDF
  const htmlContent = createPDFHTML()
  
  // Create a new window to display the document
  const printWindow = window.open('', '_blank')
  printWindow.document.write(htmlContent)
  printWindow.document.close()
  
  // Wait for the content to load, then trigger print/download
  setTimeout(() => {
    printWindow.print()
  }, 500)
}