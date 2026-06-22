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
    connectedCallback() {
        const projectId = this.dataset.projectId
        const projectName = this.dataset.projectName

        if (!projectId) throw new Error(`Missing data-project-id`)
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
        const projectId = this.dataset.projectId
        const projectName = this.dataset.projectName

        return `#command-${projectName}-content,
#post-${projectName}-prompt {
    display: none;
}

:has(showcase-state[data-focus='${projectId}']) showcase-project[data-project-id='${projectId}'] {
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
