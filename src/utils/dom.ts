export function $<
    T extends keyof HTMLElementTagNameMap | null = null,
    U = T extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[T]
        : HTMLElement,
>(selector: string) {
    return document.querySelector(selector) as U | null
}

export function $$<T extends keyof HTMLElementTagNameMap>(selector: string) {
    return document.querySelectorAll(selector) as NodeListOf<
        HTMLElementTagNameMap[T]
    >
}
