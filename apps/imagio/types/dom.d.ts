// DOM Type definitions for better TypeScript support
declare global {
  interface HTMLInputElement extends HTMLElement {
    value: string
  }
  
  interface HTMLTextAreaElement extends HTMLElement {
    value: string
  }
  
  interface HTMLSelectElement extends HTMLElement {
    value: string
  }
}

export {}