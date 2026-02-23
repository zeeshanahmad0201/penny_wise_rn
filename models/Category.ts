import { Ionicons } from '@expo/vector-icons'

export type Category = {
    label: string
    icon: keyof typeof Ionicons.glyphMap
    color: string
}
