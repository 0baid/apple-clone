import React, { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import gsap from 'gsap'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP } from '@gsap/react'

const VideoCarousel = () => {
  const videoRef = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef = useRef([])

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isPLaying: false,
    isLastVideo: false
  })

  const { isEnd, isLastVideo, isPLaying, videoId, startPlay } = video

  useGSAP(() => {
    gsap.to("video",
      {
        scrollTrigger: {
          trigger: '#video',
          toggleActions: 'restart none none none'
        },
        onComplete: () => {
          setVideo((prevVideo) => ({ ...prevVideo, startPlay: true, isPLaying: true }))
        }
      }
    )
  }, [videoId, isEnd])

  const handleLoadedMetaData = (i, e) => setLoadedData((prev) => ([...prev, e]))

  useEffect(() => {
    let currentProgress = 0

    let span = videoSpanRef.current

    if (span[video]) {
      //animate video progress

      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100)
          if (progress != currentProgress) {
            currentProgress = progress
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw' 
            })
          }

        },
        onComplete: () => {
          if (isPLaying) {
            
          }
        }
      })
      if (videoId === 0) {
        anim.restart()
      }
    }
  }, [videoId, startPlay])

  const [loadedData, setLoadedData] = useState([])


  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPLaying) {
        videoRef.current[videoId].pause()
      } else {
        startPlay && videoRef.current[videoId].play()
      }
    }

  }, [startPlay, videoId, isPLaying, loadedData])


  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((prevVideo) => ({ ...prevVideo, isEnd: true, videoId: i + 1 }))
        break;
      case 'video-last':
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: true }))
        break;
      case 'video-reset':
        setVideo((prevVideo) => ({ ...prevVideo, isLastVideo: false, videoId: 0 }))
        break;
      case 'play':
        setVideo((prevVideo) => ({ ...prevVideo, isPLaying: !prevVideo.isPLaying }))
        break;
      default:
        return video
    }
  }
  return (
    <>
      <div className='flex items-center'>
        {
          hightlightsSlides.map((list, i) => (
            <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
              <div className='video-carousel_container'>
                <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                  <video
                    id='video'
                    playsInline={true}
                    preload='auto'
                    muted
                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                    ref={(el) => (videoRef.current[i] = el)}
                    onPlay={() => {
                      setVideo((prevVideo) => ({
                        ...prevVideo, isPLaying: true
                      }))
                    }}
                  >
                    <source
                      src={list.video}
                      type='video/mp4'
                    />
                  </video>
                </div>
                <div className='absolute top-12 left-[5%] z-10'>
                  {list.textLists.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className='w-3 h-3 mx-2 bg-gray-200 rounded-full relative cursor-pointer'
            >
              <span
                ref={(el) => (videoSpanRef.current[i] = el)}
                className='absolute h-full w-full rounded-full'
              />
            </span>))}
        </div>
        <button
          className='control-btn'
          onClick={isLastVideo ? () => handleProcess('video-reset') : !isPLaying ? () => handleProcess('play') : handleProcess('pause')}
        >
          <img
            src={isLastVideo ? replayImg : !isPLaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPLaying ? 'play' : 'pause'}
            
          />
        </button>
      </div>
    </>
  )
}

export default VideoCarousel