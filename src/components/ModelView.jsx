import { PerspectiveCamera, View } from '@react-three/drei'
import React, { Suspense } from 'react'
import Lights from './Lights'
import IPhone from './IPhone'
const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, item, size }) => {
    return (
        <View
            index={index}
            id={gsapType}
            className={`h-full w-full ${index === 2} ? 'right-[-100%]' : '' `}
        >
            <ambientLight intensity={0.3}/>
            <PerspectiveCamera makeDefault position={[0,0,4]}/>
            <Lights/>
            <Suspense fallback={<div>Loading</div>}>
                <IPhone/>
            </Suspense>
        </View>
    )
}

export default ModelView