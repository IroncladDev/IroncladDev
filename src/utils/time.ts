export function waitFor(ms: number, signal?: AbortSignal) {
    return new Promise<void>((resolve, reject) => {
        if (signal?.aborted) return reject(signal.reason)

        const id = setTimeout(resolve, ms)

        signal?.addEventListener(
            'abort',
            () => {
                clearTimeout(id)
                reject(signal.reason)
            },
            { once: true },
        )
    })
}
