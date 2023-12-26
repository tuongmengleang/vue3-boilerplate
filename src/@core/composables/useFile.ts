export const displayFile = (path: string, size: string = 'original') => {
    return `${import.meta.env.VITE_FILE_URL}/${size}/${path}`
}
