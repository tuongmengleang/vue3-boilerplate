import type { Directive } from 'vue'
import { gsap } from 'gsap'

const AnimatedCounter: Directive = {
    beforeMount (el, binding) {
        el._counterAnimation = gsap.to(el, {
            innerHTML: binding.value,
            duration: 0.5,
            snap: 'innerHTML',
            ease: 'power1.inOut',
            paused: true
        })
    },
    mounted (el) {
        el._counterAnimation.play()
    },
    unmounted (el) {
        el._counterAnimation.kill()
    },
    updated (el, binding) {
        if (binding.value !== binding.oldValue) {
            el._counterAnimation.pause()
            el._counterAnimation.vars.innerHTML = binding.value
            el._counterAnimation.play()
        }
    }
}

export default AnimatedCounter
