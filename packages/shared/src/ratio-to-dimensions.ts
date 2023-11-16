export function ratioToDimensions(ratio: string): Error | string {
    let dimensions
    switch (ratio) {
        case '2:1':
            dimensions = '3000x1500'
            break
        case '21:9':
            dimensions = '3000x1285'
            break
        case '16:10':
            dimensions = '3000x1875'
            break
        case '16:9':
            dimensions = '3000x1685'
            break
        default:
            return new Error('Invalid ratio.')
    }
    return dimensions
}
