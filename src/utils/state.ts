export default class AppStateListener {
    private namespace: string

    constructor(namespace: string) {
        this.namespace = namespace
    }

    public on(
        key: string,
        callback: (args: {
            value: string | null
            oldValue: string | null
            target: HTMLElement
        }) => void,
    ) {
        const appState = document.querySelector('app-state') as HTMLElement
        const element = appState.querySelector(this.namespace) as HTMLElement

        const observer = new MutationObserver((records) => {
            const changedAttribute = records.find(
                (r) => r.type === 'attributes' && r.attributeName === key,
            )

            if (!changedAttribute) return

            const target = changedAttribute.target as HTMLElement
            const newAttributeValue = target.getAttribute(key)

            if (newAttributeValue === changedAttribute.oldValue) return

            callback({
                value: newAttributeValue,
                oldValue: changedAttribute.oldValue,
                target: target,
            })
        })

        observer.observe(element, {
            attributes: true,
            attributeFilter: [key],
        })

        return this
    }
}
