import { insertCursorBeforeEnd } from '@/utils/cursor'

export type ShellCommandStatus = 'idle' | 'running' | 'complete'
export class ShellCommandElement extends HTMLElement {
    connectedCallback() {
        const dataStatus =
            (this.dataset.status as ShellCommandStatus | undefined) ?? 'idle'
        const id = this.getAttribute('id')

        if (
            dataStatus !== 'idle' &&
            dataStatus !== 'running' &&
            dataStatus !== 'complete'
        )
            throw new Error(`Invalid status: ${dataStatus}`)

        if (!id) throw new Error(`Missing id`)

        const style = document.createElement('style')
        style.textContent = this.makeDynamicStatusStyle()
        this.prepend(style)
    }

    focusPreCursor() {
        const id = this.getAttribute('id')
        const preCursor = this.querySelector(
            `#pre-${id}-prompt`,
        ) as HTMLSpanElement

        insertCursorBeforeEnd(preCursor)

        return this
    }

    focusPostCursor() {
        const id = this.getAttribute('id')
        const postCursor = this.querySelector(
            `#post-${id}-prompt`,
        ) as HTMLSpanElement

        insertCursorBeforeEnd(postCursor)

        return this
    }

    setStatus(status: ShellCommandStatus) {
        this.setAttribute('data-status', status)

        return this
    }

    makeDynamicStatusStyle() {
        const id = this.getAttribute('id')

        return `#command-${id}-content {
    max-width: var(--max-reading-width);
}

#command-${id}-content, #post-${id}-prompt {
    display: none;
}

#${id}[data-status="running"] #command-${id}-content {
    display: flex;
}

#${id}[data-status="complete"] {
    #post-${id}-prompt {
        display: flex;
    }
    #command-${id}-content {
        display: flex;
    }
}`
    }
}
