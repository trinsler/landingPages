import { ref } from 'vue'

export function useTerminalEffects() {
  const terminalCommand = ref('')
  const isExecuting = ref(false)

  const executeCommand = async (command: string, delay = 1000) => {
    isExecuting.value = true
    terminalCommand.value = command

    return new Promise(resolve => {
      setTimeout(() => {
        isExecuting.value = false
        resolve(true)
      }, delay)
    })
  }

  const typeCommand = async (command: string, speed = 50) => {
    terminalCommand.value = ''

    for (let i = 0; i <= command.length; i++) {
      terminalCommand.value = command.slice(0, i)
      await new Promise(resolve => setTimeout(resolve, speed))
    }
  }

  const generateMatrixData = (count = 6) => {
    const data = []
    for (let i = 0; i < count; i++) {
      data.push({
        id: i,
        value: Math.random().toString(36).substring(7),
        delay: i * 200,
        position: `${Math.random() * 80 + 10}%`
      })
    }
    return data
  }

  return {
    terminalCommand,
    isExecuting,
    executeCommand,
    typeCommand,
    generateMatrixData
  }
}