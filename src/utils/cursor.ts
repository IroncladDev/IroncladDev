import { $ } from './dom'
import type { KeyInteraction } from './keys'

export const promptCursor = $<'span'>('#prompt-cursor')

export const getPromptTextNode = () =>
    promptCursor?.previousElementSibling as HTMLSpanElement

export const setPromptTextNode = (seq: KeyInteraction[]) => {
    getPromptTextNode().innerText = seq.map((s) => s.originalKey).join('')
}

export const insertCursorBeforeEnd = (node?: HTMLElement | null) => {
    if (!promptCursor) return

    node?.insertAdjacentElement('beforeend', promptCursor)
}
