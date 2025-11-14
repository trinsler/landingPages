declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }

  interface Navigator {
    mediaDevices: MediaDevices
  }

  interface MediaDevices {
    getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>
  }

  interface MediaRecorder {
    new (stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder
    ondataavailable: ((event: BlobEvent) => void) | null
    onstart: (() => void) | null
    onstop: (() => void) | null
    start(): void
    stop(): void
  }

  interface BlobEvent {
    data: Blob
  }

  interface MediaRecorderOptions {
    mimeType?: string
  }

  declare var MediaRecorder: {
    prototype: MediaRecorder
    new (stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder
  }

  declare var Audio: {
    new (src?: string): HTMLAudioElement
  }
}

export {}