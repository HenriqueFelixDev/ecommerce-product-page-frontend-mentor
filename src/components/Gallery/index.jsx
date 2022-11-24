import { useCallback, useState } from 'react'

import { Icons } from '../Icons'

const GalleryThumbnail = ({image, isSelected, onClick}) => (
    <div
        className={`w-20 h-20 rounded-lg overflow-hidden transition-all border-2 hover:opacity-60 ${isSelected ? ' border-orange' : 'border-transparent'}`}
        role="button"
        onClick={onClick}
        >
            <img
                className={`w-full h-full object-cover transition-all ${isSelected ? 'opacity-40' : ''}`}
                src={image}
            />
    </div>
)

const GalleryNavigationButton = ({children, onClick}) => (
    <button
        onClick={onClick}
        className="flex justify-center items-center bg-white rounded-full w-14 h-14 md:w-10 md:h-10"
        >
            { children }
    </button>
)

const GalleryNavigationControls = ({showControls, onNextClick, onPreviousClick}) => (
    <div className={`${showControls ? '' : 'md:hidden' } absolute inset-4 md:-inset-5 flex items-center justify-between`}>
        <GalleryNavigationButton onClick={onPreviousClick}>
            <Icons icon="previous" height="12" width="8" />
        </GalleryNavigationButton>

        <GalleryNavigationButton onClick={onNextClick}>
            <Icons icon="next" height="12" width="8" />
        </GalleryNavigationButton>
    </div>
)

export const Gallery = ({images, onMainImageClick, showControls}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const showNextImage = event => {
        event.stopPropagation()

        setSelectedIndex(prevState => {
            const nextImage = prevState + 1
            return nextImage >= images.length ? prevState : nextImage
        })
    }

    const showPreviousImage = event => {
        event.stopPropagation()

        setSelectedIndex(prevState => {
            const previousImage = prevState - 1
            return previousImage < 0 ? 0 : previousImage
        })
    }

    return (
        <div>
            <div className="relative" role="button" onClick={onMainImageClick}>
                <img
                    className="w-full md:rounded-xl"
                    src={images[selectedIndex].image}
                />

                <GalleryNavigationControls
                    onNextClick={showNextImage}
                    onPreviousClick={showPreviousImage}
                    showControls={showControls}
                />
            </div>

            <div className="hidden md:flex justify-between mt-8 space-x-4">
                {images.map((image, index) => (
                    <GalleryThumbnail
                        image={image.thumbnail}
                        isSelected={selectedIndex === index}
                        onClick={() => setSelectedIndex(index)}
                    />
                ))}
            </div>
        </div>
    )
}