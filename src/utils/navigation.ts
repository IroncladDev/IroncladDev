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

window.navController = new AbortController()

declare global {
    interface Window {
        navController: AbortController
    }
}

export const openScreen = async (screen: ScreenName) => {
    window.navController.abort('navigating')
    window.navController = new AbortController()

    const navigationState = document.querySelector(
        'navigation-state',
    ) as HTMLElement
    const tiles = document.getElementById('tiles') as HTMLDivElement
    const screenTiles = document.querySelectorAll(
        '.tile[data-screen]',
    ) as NodeListOf<HTMLDivElement>
    const targetScreen = document.querySelector(
        `.tile[data-screen='${screen}']`,
    ) as HTMLDivElement

    await tapSequence(tapSequenceMap[screen], window.navController)
    await waitFor(500, window.navController)
    targetScreen.style.animationName = 'place'
    targetScreen.style.display = 'flex'
    tiles.insertAdjacentElement('beforeend', targetScreen)
    await waitFor(keyRate * 2, window.navController)
    await tapSequence('<M-w>', window.navController)
    await waitFor(keyRate * 4, window.navController)

    navigationState.setAttribute('data-focus', screen)
    screenTiles.forEach((tile) => {
        if (tile.getAttribute('data-screen') === screen) {
            tile.style.animationName = 'place'
            return
        }
        tile.style.animationName = 'remove'
    })
}
