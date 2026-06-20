import { $ } from './dom'
import type { KeyInteraction } from './keys'

const getOrCreatePromptCursor = () => {
    const promptCursor = $<'span'>('#prompt-cursor')
    if (promptCursor) return promptCursor

    const newCursor = document.createElement('span')
    newCursor.setAttribute('is-', 'spinner')
    newCursor.setAttribute('variant-', 'block')
    newCursor.setAttribute('id', 'prompt-cursor')

    return newCursor
}

export const getPromptTextNode = () =>
    getOrCreatePromptCursor().previousElementSibling as HTMLSpanElement

export const setPromptTextNode = (seq: KeyInteraction[]) => {
    getPromptTextNode().innerText = seq.map((s) => s.originalKey).join('')
}

export const insertCursorBeforeEnd = (node?: HTMLElement | null) => {
    node?.insertAdjacentElement('beforeend', getOrCreatePromptCursor())
}
