export function $<
    T extends keyof HTMLElementTagNameMap | null = null,
    U = T extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[T]
        : HTMLElement,
>(selector: string) {
    return document.querySelector(selector) as U | null
}

export function $$<
    T extends keyof HTMLElementTagNameMap | null = null,
    U = T extends keyof HTMLElementTagNameMap
        ? HTMLElementTagNameMap[T]
        : HTMLElement,
>(selector: string) {
    return Array.from(document.querySelectorAll(selector)) as Array<U>
}
