import { $ } from '@/utils/dom'
import type {
    ShellCommandElement,
    ShellCommandStatus,
} from '../ShellCommand/ShellCommandElement'

export class ShowcaseProjectElement extends HTMLElement {
    connectedCallback() {
        const projectId = this.dataset.projectId
        const projectName = this.dataset.projectName

        if (!projectId) throw new Error(`Missing data-project-id`)
        if (!projectName) throw new Error(`Missing data-project-name`)

        const style = document.createElement('style')
        style.textContent = this.makeDynamicStatusStyle()
        this.prepend(style)

        const prevButton = this.querySelector('#prev') as HTMLButtonElement
        const nextButton = this.querySelector('#next') as HTMLButtonElement
        const shellCommand = this.querySelector(
            'shell-command',
        ) as ShellCommandElement
        const showcaseState = $('showcase-state')
        const lastShowcaseProject = $(
            'showcase-project:last-of-type',
        ) as ShowcaseProjectElement

        if (projectId === '0') {
            prevButton.disabled = true
        }

        if (projectId === lastShowcaseProject.getAttribute('data-project-id')) {
            nextButton.disabled = true
        }

        prevButton.addEventListener('click', () => {
            this.setCommandStatus('complete')
            shellCommand.focusPostCursor()
            showcaseState?.setAttribute('data-open', `${Number(projectId) - 1}`)
        })

        nextButton.addEventListener('click', () => {
            this.setCommandStatus('complete')
            shellCommand.focusPostCursor()
            showcaseState?.setAttribute('data-open', `${Number(projectId) + 1}`)
        })
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
#button-controls-${projectName},
#post-${projectName}-prompt {
    display: none;
}

:has(showcase-state[data-focus='${projectId}']) showcase-project[data-project-id='${projectId}'] {
    &:has(shell-command[data-status='running']) {
        #command-${projectName}-content {
            display: flex;
        }
        #button-controls-${projectName} {
            display: flex;
        }
    }

    &:has(shell-command[data-status='complete']) {
        #command-${projectName}-content {
            display: flex;
        }
        #post-${projectName}-prompt {
            display: flex;
        }
    }
}`
    }
}
