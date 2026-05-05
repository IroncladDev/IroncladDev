import { ScreenName } from '@/types/state'
import { tapSequence } from '@/utils/keyboard'
import { keyRate } from '@/utils/keys'
import { waitFor } from './time'

declare global {
    interface Window {
        navController: AbortController
    }
}

export let tileController = new AbortController()

export const openTile = async (tileNode: HTMLDivElement, sequence: string) => {
    tileController.abort('navigating')
    tileController = new AbortController()

    const tiles = document.getElementById('tiles') as HTMLDivElement
    const otherTiles = document.querySelectorAll(
        '#tiles .tile',
    ) as NodeListOf<HTMLDivElement>

    await tapSequence(sequence, window.navController)
    await waitFor(500, window.navController)
    tileNode.style.animationName = 'place'
    tileNode.style.display = 'flex'
    tiles.insertAdjacentElement('beforeend', tileNode)
    await waitFor(keyRate * 2, window.navController)
    await tapSequence('<M-w>', window.navController)
    await waitFor(keyRate * 4, window.navController)

    otherTiles.forEach((tile) => {
        if (tile === tileNode) return

        tile.style.animationName = 'remove'
    })
}
