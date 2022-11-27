import { useState } from 'react'

import { Icons } from '../Icons'

const GalleryThumbnail = ({image, isSelected, onClick}) => (
    <div
        className={`w-20 h-20 rounded-lg overflow-hidden transition-all border-2 hover:opacity-60 ${isSelected ? ' border-orange' : 'border-transparent'}`}
        role="button"
        onClick={onClick}
        aria-label="Select image"
        >
            <img
                className={`w-full h-full object-cover transition-all ${isSelected ? 'opacity-40' : ''}`}
                src={image}
                alt="Product thumbnail"
            />
    </div>
)

const GalleryNavigationButton = ({icon, onClick}) => (
    <button
        onClick={onClick}
        className="pointer-events-auto flex justify-center items-center bg-white rounded-full w-14 h-14 md:w-10 md:h-10"
        >
            <Icons icon={icon} height="12" width="8" />
    </button>
)

const GalleryNavigationControls = ({onLightbox, onNextClick, onPreviousClick}) => (
    <div className={`${onLightbox ? '-left-7 md:-left-5 -right-7 md:-right-5' : 'md:hidden'} pointer-events-none flex justify-between absolute top-1/2 -translate-y-1/2`}>
        <GalleryNavigationButton icon="previous" onClick={onPreviousClick} />

        <GalleryNavigationButton icon="next" onClick={onNextClick} />
    </div>
)

export const Gallery = ({images, onMainImageClick, onLightbox}) => {
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
            <div className="relative">
                <button
                    className="w-full"
                    disabled={!onMainImageClick}
                    aria-label="Open gallery lightbox"
                    onClick={() => onMainImageClick(selectedIndex)}
                    >
                        <img
                            className={`w-full md:rounded-xl ${onLightbox ? 'rounded-xl' : ''}`}
                            src={images[selectedIndex].image}
                            alt="Selected product image on gallery"
                        />
                </button>

                <GalleryNavigationControls
                    onNextClick={showNextImage}
                    onPreviousClick={showPreviousImage}
                    onLightbox={onLightbox}
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