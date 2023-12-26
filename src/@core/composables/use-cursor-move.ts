export const useCursorMove = () => {
    window.addEventListener('mousemove', (evt: MouseEvent) => {
        const circle = document.querySelector('#cursor .circle') as HTMLElement
        circle.style.transform = `translateX(calc(${evt.clientX}px - 1.25rem)) translateY(calc(${evt.clientY}px - 1.25rem))`
    })
}
