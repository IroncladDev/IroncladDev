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
    setTimeout(() => {
        clone.pause()
        clone.remove()
    }, duration)
}

async function tapKey(key: string) {
    const keyButton = document.querySelector(`#key-${key}`)

    await playSound(Math.floor(Math.random() * 40).toString())

    if (keyButton) {
        keyButton.classList.add('pressed')
        setTimeout(() => {
            keyButton.classList.remove('pressed')
        }, 250)
    }
}

async function holdKeyFor(key: string, duration: number) {
    const keyButton = document.querySelector(`#key-${key}`)

    await playSound('2')

    if (keyButton) {
        keyButton.classList.add('pressed')
        setTimeout(() => {
            keyButton.classList.remove('pressed')
            playSound('3')
        }, duration)
    }
}

export async function tapSequence(
    sequence: Array<['tap', string] | ['hold', string, number]>,
    duration: number,
) {
    for (let i = 0; i < sequence.length; i++) {
        const [type, key, dur] = sequence[i]

        setTimeout(() => {
            if (type === 'hold') {
                holdKeyFor(key, dur)
            } else {
                tapKey(key)
            }
        }, i * duration)
    }
}
