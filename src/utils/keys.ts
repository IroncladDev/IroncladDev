export const keyRate = 125
export const tapDuration = 150

export type KeyTap = {
    type: 'tap'
    key: string
    originalKey: string
}
export type KeyHold = {
    type: 'hold'
    key: string
    holdMultiplier: number
    modifierName: string
    originalKey: string
}
export type KeyInteraction = KeyTap | KeyHold

const specialKeyMap: Record<string, string> = {
    ',': 'comma',
    '.': 'dot',
    ' ': 'spc',
    CR: 'ret',
    BSP: 'bsp',
}

const modifierMap: Record<string, string> = {
    C: 'ctl',
    S: 'spc',
    M: 'ret',
    A: 'alt',
}

const keyToModifierName: Record<
    (typeof modifierMap)[keyof typeof modifierMap],
    string
> = {
    ret: 'SUP',
    spc: 'SFT',
    ctl: 'CTL',
    alt: 'ALT',
}

// Maps a raw string to an array of key interactions
// converts a typed sequence to a sequence of `KeyInteraction`s
export function makeTypedKeySequence(raw: string): Array<KeyInteraction> {
    const singletonModifier = Object.keys(modifierMap).join('')
    const keyMatcher = /[a-zA-Z\s.,]/
    const modifierMatcher = new RegExp(
        `<[${singletonModifier}](-${keyMatcher.source})+>`,
    )
    const singletonMatcher = /<(CR|BSP)>/
    const unionMatcher = new RegExp(
        `${singletonMatcher.source}|${modifierMatcher.source}|${keyMatcher.source}`,
        'g',
    )
    const stringSequence =
        (typeof raw === 'string' ? raw : '').match(unionMatcher) ?? []

    const sequence: Array<KeyInteraction> = []

    for (let i = 0; i < stringSequence.length; i++) {
        const str = stringSequence[i]
        if (str.length === 1) {
            const derivedKey = specialKeyMap[str] ?? str

            sequence.push({ type: 'tap', key: derivedKey, originalKey: str })
        } else if (modifierMatcher.test(str)) {
            const holdSequence = str
                .replaceAll('<', '')
                .replaceAll('>', '')
                .split('-')
            const modifiers = holdSequence.slice(0, -1)
            const key = holdSequence.at(-1)

            for (let j = 0; j < modifiers.length; j++) {
                const mod = modifiers[j]
                const modifier = modifierMap[mod]
                const modifierName = keyToModifierName[modifier]
                sequence.push({
                    type: 'hold',
                    key: modifier,
                    modifierName,
                    originalKey: str,
                    holdMultiplier: j + 1,
                })
            }

            if (key) {
                const derivedKey = specialKeyMap[key] ?? key

                sequence.push({
                    type: 'tap',
                    key: derivedKey,
                    originalKey: str,
                })
            }
        } else if (singletonMatcher.test(str)) {
            const [key] = str.replaceAll('<', '').replaceAll('>', '').split('-')

            const derivedKey = specialKeyMap[key] ?? key

            sequence.push({ type: 'tap', key: derivedKey, originalKey: '' })
        }
    }

    return sequence
}
