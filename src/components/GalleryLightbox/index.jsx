import { Gallery } from '../Gallery'
import { Icons } from '../Icons'

export const GalleryLightbox = ({images, onCloseClick}) => (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center">
        <div className="text-right space-y-2 w-80">
            <button
                className="text-white hover:text-orange"
                onClick={onCloseClick}
                aria-label="Close lightbox"
                >
                    <Icons icon="close" />
            </button>
            
            <Gallery images={images} onLightbox={true} />
        </div>
    </div>
)