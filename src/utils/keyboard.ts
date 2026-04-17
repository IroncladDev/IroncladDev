import { makeTypedKeySequence, tapDuration, type KeyInteraction } from './keys'
import { keyRate } from './keys'
import { waitFor } from './time'

const audio = new Audio('/eg-crystal-purple/purple.ogg')

interface SoundConfig {
    defines: Record<string, [number, number] | null>
}

const configPromise: Promise<SoundConfig> = fetch(
    '/eg-crystal-purple/config.json',
).then((r) => r.json())

async function playSound(soundId: string) {
    const config = await configPromise
    const timing = config.defines[soundId]
    if (!timing) return

    const [start, duration] = timing
    const clone = audio.cloneNode() as HTMLAudioElement
    clone.currentTime = start / 1000
    clone.play()
    await waitFor(duration)
    clone.pause()
    clone.remove()
}

async function tapKey(key: string) {
    const keyButton = document.querySelector(`#key-${key}`)

    await playSound(Math.floor(Math.random() * 40).toString())

    if (keyButton) {
        keyButton.classList.add('tapped')
        await waitFor(tapDuration)
        keyButton.classList.remove('tapped')
    }
}

async function holdKeyFor(
    key: string,
    duration: number,
    modifierName?: string,
) {
    const keyButton = document.querySelector(`#key-${key}`) as HTMLElement

    if (!keyButton) return

    await playSound('2')

    const oldText = keyButton.innerText
    keyButton.classList.add('held')
    if (modifierName) keyButton.innerText = modifierName
    await waitFor(duration)
    keyButton.classList.remove('held')
    keyButton.innerText = oldText
}

export function tapSequence(
    raw: string,
    options?: {
        onType?: (interactions: KeyInteraction[]) => void
        signal?: AbortSignal
    },
) {
    return new Promise<void>((resolve, reject) => {
        const sequence = makeTypedKeySequence(raw)
        const timeouts: ReturnType<typeof setTimeout>[] = []

        for (let i = 0; i < sequence.length; i++) {
            const seq = sequence[i]

            timeouts.push(
                setTimeout(() => {
                    if (seq.type === 'hold') {
                        holdKeyFor(
                            seq.key,
                            keyRate * seq.holdMultiplier + keyRate,
                            seq.modifierName,
                        )
                    } else {
                        tapKey(seq.key)
                    }
                    options?.onType?.(sequence.slice(0, i + 1))
                    if (i === sequence.length - 1) resolve()
                }, i * keyRate),
            )
        }

        options?.signal?.addEventListener(
            'abort',
            () => {
                timeouts.forEach((timeout) => clearTimeout(timeout))
                reject(options.signal?.reason)
            },
            { once: true },
        )
    })
}
