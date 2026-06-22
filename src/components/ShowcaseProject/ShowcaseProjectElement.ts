import { $$ } from '@/utils/dom'
import type {
    ShellCommandElement,
    ShellCommandStatus,
} from '../ShellCommand/ShellCommandElement'

declare global {
    interface HTMLElementTagNameMap {
        'showcase-project': ShowcaseProjectElement
    }
}

export class ShowcaseProjectElement extends HTMLElement {
    get projectId() {
        return $$('showcase-project').indexOf(this)
    }

    connectedCallback() {
        const projectName = this.dataset.projectName

        if (!projectName) throw new Error(`Missing data-project-name`)

        const style = document.createElement('style')
        style.textContent = this.makeDynamicStatusStyle()
        this.prepend(style)
    }

    setCommandStatus(status: ShellCommandStatus) {
        ;(
            this.querySelector('shell-command') as ShellCommandElement
        )?.setStatus(status)
    }

    makeDynamicStatusStyle() {
        const projectName = this.dataset.projectName

        return `#command-${projectName}-content,
#post-${projectName}-prompt {
    display: none;
}

:has(showcase-state[data-focus='${this.projectId}']) showcase-project[data-project-id='${this.projectId}'] {
    &:has(shell-command[data-status='running']) {
        #command-${projectName}-content,
        #separator-${projectName},
        #button-controls-${projectName} {
            display: flex;
        }
    }

    &:has(shell-command[data-status='complete']) {
        #command-${projectName}-content,
        #post-${projectName}-prompt {
            display: flex;
        }
    }
}`
    }
}
