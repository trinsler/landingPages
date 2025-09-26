 Monorepo Best-Practice Transformation Plan (Fokussiert)                                                                                       │ │
│ │                                                                                                                                               │ │
│ │ Phase 1: Cleanup & Standardisierung (Priorität 1)                                                                                             │ │
│ │                                                                                                                                               │ │
│ │ 1.1 Package Manager Konsistenz                                                                                                                │ │
│ │                                                                                                                                               │ │
│ │ - Alle Skripte in package.json auf pnpm standardisieren                                                                                       │ │
│ │ - Npm-Referenzen durch pnpm ersetzen                                                                                                          │ │
│ │                                                                                                                                               │ │
│ │ 1.2 Theme System Normalisierung                                                                                                               │ │
│ │                                                                                                                                               │ │
│ │ - Trinsler-App auf externe Theme-Imports umstellen (wie coin-boilerplate-app)                                                                 │ │
│ │ - Theme CSS aus main.css extrahieren und korrekt importieren                                                                                  │ │
│ │ - Legacy Theme-Variablen aus beiden Apps entfernen                                                                                            │ │
│ │                                                                                                                                               │ │
│ │ 1.3 Temporäre Dateien entfernen                                                                                                               │ │
│ │                                                                                                                                               │ │
│ │ - fix-utility-classes.js löschen (Migrations-Script)                                                                                          │ │
│ │ - Falsch platzierte .github/workflows/.github/ Ordner bereinigen                                                                              │ │
│ │ - Verwaiste Konfigurationsdateien aufräumen                                                                                                   │ │
│ │                                                                                                                                               │ │
│ │ 1.4 Node.js Version vereinheitlichen                                                                                                          │ │
│ │                                                                                                                                               │ │
│ │ - Workflow-Konfiguration auf konsistente Node-Version aktualisieren                                                                           │ │
│ │                                                                                                                                               │ │
│ │ Phase 2: Shared Configurations (Priorität 2)                                                                                                  │ │
│ │                                                                                                                                               │ │
│ │ 2.1 Gemeinsame Tailwind Config                                                                                                                │ │
│ │                                                                                                                                               │ │
│ │ - Tailwind-Konfiguration in packages/ui zentralisieren                                                                                        │ │
│ │ - Beide Apps nutzen gemeinsame Config via workspace-Referenz                                                                                  │ │
│ │ - Theme-spezifische CSS-Variablen automatisch einbinden                                                                                       │ │
│ │                                                                                                                                               │ │
│ │ 2.2 Dependency Konsolidierung                                                                                                                 │ │
│ │                                                                                                                                               │ │
│ │ - Gemeinsame Dependencies ins Root-Package verschieben                                                                                        │ │
│ │ - Peer Dependencies in Packages korrekt definieren                                                                                            │ │
│ │ - Workspace-Abhängigkeiten optimieren                                                                                                         │ │
│ │                                                                                                                                               │ │
│ │ 2.3 Build & Dev Scripts vereinheitlichen                                                                                                      │ │
│ │                                                                                                                                               │ │
│ │ - Einheitliche Skript-Namen für alle Apps                                                                                                     │ │
│ │ - Parallele Build-Unterstützung hinzufügen                                                                                                    │ │
│ │ - Error-Handling in Build-Prozess verbessern                                                                                                  │ │
│ │                                                                                                                                               │ │
│ │ Phase 3: Code Style & Struktur (Priorität 2)                                                                                                  │ │
│ │                                                                                                                                               │ │
│ │ 3.1 Component-Struktur harmonisieren                                                                                                          │ │
│ │                                                                                                                                               │ │
│ │ - Ähnliche Komponenten-Patterns zwischen Apps etablieren                                                                                      │ │
│ │ - TypeScript-Definitionen vereinheitlichen                                                                                                    │ │
│ │ - Props/Events-Konventionen standardisieren                                                                                                   │ │
│ │                                                                                                                                               │ │
│ │ 3.2 Shadcn/UI Integration optimieren                                                                                                          │ │
│ │                                                                                                                                               │ │
│ │ - Utility-Classes konsistent verwenden                                                                                                        │ │
│ │ - Custom CSS-Klassen durch shadcn-Varianten ersetzen                                                                                          │ │
│ │ - Theme-agnostische Komponenten in UI-Package                                                                                                 │ │
│ │                                                                                                                                               │ │
│ │ 3.3 File-Organisation verbessern                                                                                                              │ │
│ │                                                                                                                                               │ │
│ │ - Konsistente Ordnerstruktur zwischen Apps                                                                                                    │ │
│ │ - Shared Types in packages/shared zentralisieren                                                                                              │ │
│ │ - Common Utils konsolidieren                                                                                                                  │ │
│ │                                                                                                                                               │ │
│ │ Phase 4: Developer & AI Experience (Priorität 3)                                                                                              │ │
│ │                                                                                                                                               │ │
│ │ 4.1 Unified Development Commands                                                                                                              │ │
│ │                                                                                                                                               │ │
│ │ - dev:all - Alle Apps parallel starten                                                                                                        │ │
│ │ - build:all - Alle Apps parallel builden                                                                                                      │ │
│ │ - theme:preview - Theme-Switching mit Live-Reload                                                                                             │ │
│ │                                                                                                                                               │ │
│ │ 4.2 Linting & Formatting                                                                                                                      │ │
│ │                                                                                                                                               │ │
│ │ - ESLint-Config in shared Package                                                                                                             │ │
│ │ - Prettier-Konfiguration vereinheitlichen                                                                                                     │ │
│ │ - Pre-commit Hooks für Code-Quality                                                                                                           │ │
│ │                                                                                                                                               │ │
│ │ 4.3 AI-Optimierte Dokumentation & Automation                                                                                                  │ │
│ │                                                                                                                                               │ │
│ │ - README.md in jedem App-Ordner mit Struktur-Erklärung                                                                                        │ │
│ │ - ARCHITECTURE.md im Root mit Monorepo-Übersicht                                                                                              │ │
│ │ - COMPONENTS.md in packages/ui mit Component-API                                                                                              │ │
│ │ - THEMES.md erweitern mit AI-freundlichen Beispielen                                                                                          │ │
│ │ - App-Generator mit AI-optimierten Templates verbessern                                                                                       │ │
│ │ - Context-Dateien für AI: .ai-context.md in wichtigen Ordnern                                                                                 │ │
│ │ - Pattern-Library dokumentieren für konsistente Code-Generation                                                                               │ │
│ │                                                                                                                                               │ │
│ │ 4.4 AI-freundliche Struktur                                                                                                                   │ │
│ │                                                                                                                                               │ │
│ │ - Konsistente Dateinamen und Ordnerstrukturen                                                                                                 │ │
│ │ - Explizite Type-Definitionen in shared/types                                                                                                 │ │
│ │ - Kommentierte Konfigurationsdateien                                                                                                          │ │
│ │ - Template-Files für neue Components/Pages                                                                                                    │ │
│ │ - JSON-Schema für App-Konfigurationen                                                                                                         │ │
│ │                                                                                                                                               │ │
│ │ Erwartete Ergebnisse                                                                                                                          │ │
│ │                                                                                                                                               │ │
│ │ Nach der Transformation:                                                                                                                      │ │
│ │ - ✅ AI-Ready: Klare Dokumentation ermöglicht schnelle AI-Unterstützung                                                                        │ │
│ │ - ✅ Konsistent: Einheitlicher Code-Style zwischen Apps                                                                                        │ │
│ │ - ✅ Flexibel: Einfacher Theme-Wechsel zwischen Apps                                                                                           │ │
│ │ - ✅ Erweiterbar: Schnelle neue App-Erstellung mit AI-Hilfe                                                                                    │ │
│ │ - ✅ Wartbar: Zentrale Konfigurationen und Dependencies                                                                                        │ │
│ │ - ✅ Developer-freundlich: Optimierte DX mit vereinheitlichten Commands                                                                        │ │
│ │ - ✅ Best-Practice: Moderne Monorepo-Standards                                                                                                 │ │
│ │                                                                                                                                               │ │
│ │ AI-Unterstützung wird möglich bei:                                                                                                            │ │
│ │ - Neue App-Erstellung (Templates + Dokumentation)                                                                                             │ │
│ │ - Component-Entwicklung (Pattern-Library)                                                                                                     │ │
│ │ - Theme-Anpassungen (Dokumentierte Variablen)                                                                                                 │ │
│ │ - Bug-Fixing (Klare Code-Struktur)                                                                                                            │ │
│ │ - Feature-Entwicklung (Konsistente Patterns)      