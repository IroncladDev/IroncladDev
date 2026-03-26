import { ScreenName } from '@/types/state'
import { tapSequence } from '@/utils/keyboard'

const keyRate = 100

const tapSequenceMap: Record<
    ScreenName,
    Array<
        | ['tap', string]
        | ['hold', string, number]
        | ['hold', string, number, string]
    >
> = {
    [ScreenName.Splash]: [],
    [ScreenName.Info]: [
        ['hold', 'ret', keyRate * 3, 'SUP'],
        ['hold', 'ctl', keyRate * 2],
        ['tap', 'a'],
    ],
    [ScreenName.Projects]: [
        ['hold', 'ret', keyRate * 2, 'SUP'],
        ['tap', 'p'],
    ],
    [ScreenName.Links]: [
        ['hold', 'ret', keyRate * 3, 'SUP'],
        ['hold', 'ctl', keyRate * 2],
        ['tap', 'c'],
    ],
    [ScreenName.Opinions]: [
        ['hold', 'ret', keyRate * 3, 'SUP'],
        ['tap', 'b'],
    ],
}

let reorderTimeout: ReturnType<typeof setTimeout> | undefined
let keyTimeout: ReturnType<typeof setTimeout> | undefined
let hideOthersTimeout: ReturnType<typeof setTimeout> | undefined

export const openScreen = (screen: ScreenName) => {
    const appState = document.querySelector('app-state') as HTMLElement
    const tiles = document.getElementById('tiles') as HTMLDivElement
    const screenTiles = document.querySelectorAll(
        '.tile[screen-]',
    ) as NodeListOf<HTMLDivElement>
    const targetScreen = document.querySelector(
        `.tile[screen-='${screen}']`,
    ) as HTMLDivElement

    clearTimeout(reorderTimeout)
    clearTimeout(keyTimeout)
    clearTimeout(hideOthersTimeout)

    tapSequence(tapSequenceMap[screen], keyRate)
    reorderTimeout = setTimeout(() => {
        targetScreen.style.animationName = 'place'
        targetScreen.style.display = 'flex'
        tiles.insertAdjacentElement('beforeend', targetScreen)
    }, keyRate * 4)
    keyTimeout = setTimeout(() => {
        tapSequence(
            [
                ['hold', 'ret', keyRate * 2, 'SUP'],
                ['tap', 'w'],
            ],
            keyRate,
        )
    }, keyRate * 6)
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
    }, keyRate * 8)
}

declare global {
    interface WindowEventMap {
        'site:navigate': CustomEvent<{ screen: ScreenName }>
    }
}
