import { tapSequence } from '@/utils/keyboard'
import { keyRate } from '@/utils/keys'
import { waitFor } from './time'

export let tileController = new AbortController()

export const openTile = async (tileNode: HTMLDivElement, sequence: string) => {
    tileController.abort('navigating')
    tileController = new AbortController()

    const tiles = document.getElementById('tiles') as HTMLDivElement
    const otherTiles = tiles.querySelectorAll(
        '.tile',
    ) as NodeListOf<HTMLElement>

    await tapSequence(sequence, tileController)
    await waitFor(500, tileController)
    tileNode.style.animationName = 'place'
    tileNode.style.display = 'flex'
    tiles.insertAdjacentElement('beforeend', tileNode)
    await waitFor(keyRate * 2, tileController)
    await tapSequence('<M-w>', tileController)
    await waitFor(keyRate * 4, tileController)

    otherTiles.forEach((tile) => {
        if (tile === tileNode) return

        tile.style.animationName = 'remove'
    })
}

export const showTile = async (tileNode: HTMLDivElement) => {
    const otherTiles = document.querySelectorAll(
        '#tiles .tile',
    ) as NodeListOf<HTMLElement>

    otherTiles.forEach((tile) => {
        if (tile === tileNode) tile.classList.add('initial')
        else tile.classList.remove('initial')
    })
}
