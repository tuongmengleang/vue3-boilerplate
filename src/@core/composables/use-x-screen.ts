import { ref, reactive, onMounted, onUnmounted } from 'vue'

export type ScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' }
export const defaultScreenConfig: {
    [key in ScreenSize]: number
} = {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
}

export const useXScreen = () => {
    const screenSize = reactive({
        width: 0,
        height: 0
    })

    const current = ref<ScreenSize>('sm')

    const getSize = (width?: number) => {
        if (width === undefined) width = screenSize.width
        const { xs, sm, md, lg, xl } = defaultScreenConfig
        if (width < Number(xs)) return 'xs'
        if (width < Number(sm)) return 'sm'
        if (width < Number(md)) return 'md'
        if (width < Number(lg)) return 'lg'
        if (width < Number(xl)) return 'xl'
        return 'xl'
    }

    const onWindowResize = () => {
        const { innerWidth, innerHeight } = window
        screenSize.width = innerWidth
        screenSize.height = innerHeight
        current.value = getSize()
    }

    const higherThan = (size: ScreenSize, defScreenSize?: ScreenSize) => {
        const { xs, sm, md, lg, xl } = defaultScreenConfig
        const width = defaultScreenConfig[defScreenSize || current.value]
        if (size === 'xs') return width >= Number(xs)
        if (size === 'sm') return width >= Number(sm)
        if (size === 'md') return width >= Number(md)
        if (size === 'lg') return width >= Number(lg)
        if (size === 'xl') return width >= Number(xl)
        return false
    }

    onMounted(() => {
        if (typeof window === 'undefined') return
        window.addEventListener('resize', onWindowResize)
        current.value = getSize(window.innerWidth)
    })

    onUnmounted(() => {
        if (typeof window === 'undefined') return
        window.removeEventListener('resize', onWindowResize)
    })

    return {
        getSize,
        screenSize,
        current,
        higherThan
    }
}

export const isMobile = () => {
    const keywords = ref(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    )
    return keywords.value.test(navigator.userAgent)
}
