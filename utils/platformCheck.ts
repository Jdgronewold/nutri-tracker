import { Platform } from 'react-native'

export function platformCheck(webBehavior: () => void, phoneBehavior: () => {}) {
  if (Platform.OS === "web") { 
    webBehavior()
  } else {
    phoneBehavior()
  }
}