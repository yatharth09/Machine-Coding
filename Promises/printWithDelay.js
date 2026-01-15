function printWithDelay(message, delay) {
    message.reduce((p, item) => {
        return p.then(() => new Promise((resolve) => {
            setTimeout(() => {
                console.log(item)
                resolve()
            }, delay)
        }))
    }, Promise.resolve())
}
