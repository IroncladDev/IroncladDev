import { ScreenName } from '@/types/state'
import { tapSequence } from '@/utils/keyboard'
import { keyRate } from '@/utils/keys'
import { waitFor } from './time'

const tapSequenceMap: Record<ScreenName, string> = {
    [ScreenName.Splash]: '',
    [ScreenName.Info]: '<M-C-a>',
    [ScreenName.Projects]: '<M-p>',
    [ScreenName.Links]: '<M-C-c>',
    [ScreenName.Opinions]: '<M-b>',
}

let keyTimeout: ReturnType<typeof setTimeout> | undefined
let hideOthersTimeout: ReturnType<typeof setTimeout> | undefined

export const openScreen = async (screen: ScreenName) => {
    const appState = document.querySelector('app-state') as HTMLElement
    const tiles = document.getElementById('tiles') as HTMLDivElement
    const screenTiles = document.querySelectorAll(
        '.tile[screen-]',
    ) as NodeListOf<HTMLDivElement>
    const targetScreen = document.querySelector(
        `.tile[screen-='${screen}']`,
    ) as HTMLDivElement

    clearTimeout(keyTimeout)
    clearTimeout(hideOthersTimeout)

    await tapSequence(tapSequenceMap[screen])
    await waitFor(500)
    targetScreen.style.animationName = 'place'
    targetScreen.style.display = 'flex'
    tiles.insertAdjacentElement('beforeend', targetScreen)
    keyTimeout = setTimeout(() => {
        tapSequence('<M-w>')
    }, keyRate * 2)
    hideOthersTimeout = setTimeout(() => {
        appState.setAttribute('focus-', screen)
        screenTiles.forEach((tile) => {
            if (tile.getAttribute('screen-') === screen) return
            tile.style.animationName = 'remove'
        })
        window.dispatchEvent(
            new CustomEvent('site:navigate', {
                detail: { screen },
            }),
        )
    }, keyRate * 6)
}

declare global {
    interface WindowEventMap {
        'site:navigate': CustomEvent<{ screen: ScreenName }>
    }
}
