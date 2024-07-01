import React, { useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { heroVideo,smallHeroVideo } from '../utils'

const Hero = () => {
    const [videoSrc,setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
    useGSAP(() => {
        gsap.to('#hero-text',{
            opacity:1,
            delay:1.5
        })
    }, [])

    const handleVideoSrcSet = () =>{
        if(window.innerWidth < 760){
            setVideoSrc(smallHeroVideo)
        }else{
            setVideoSrc(videoSrc)
        }
    }

    useEffect(() => {
        window.addEventListener('resize',handleVideoSrcSet)

        return () => {
            window.removeEventListener('resize',handleVideoSrcSet)
        }
    },[])

    return (
        <section className='w-full nav-height bg-black relative'>
            <div className='h-5/6 w-full flex-col flex-center'>
                <p id='hero-text' className='hero-title'>iPhone 15 Pro</p>
                <div className='md:w-10/12 w-9/12'>
                    <video autoPlay muted playsInline key={videoSrc} className='pointer-events-none'>
                        <source src={videoSrc} type='video/mp4' />
                    </video>
                </div>
            </div>
        </section>
    )
}

export default Hero