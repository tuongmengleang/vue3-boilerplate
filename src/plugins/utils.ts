export const isDevelopment = (): boolean => {
    return process.env.NODE_ENV === 'development'
}
export const isProduction = (): boolean => {
    return process.env.NODE_ENV === 'production'
}

export const useDevToolsDetection = (): boolean => {
    const threshold = 160;
    return window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;
}
