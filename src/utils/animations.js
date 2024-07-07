export const animateWithGsapTimeLine = (timeline, rotataionRef, rotataionState, fistTarget, secondTarget, animationProps) => {
    timeline.to(rotataionRef.current.rotation, {
        ye: rotataionState,
        duration: 1,
        ease: 'power2.inOut'
    })
    timeline.to(fistTarget, {
        ...animationProps,
        ease: 'power2.inOut',
    },
        '<'

    )
    timeline.to(secondTarget, {
        ...animationProps,
        ease: 'power2.inOut',
    },
        '<'

    )
}