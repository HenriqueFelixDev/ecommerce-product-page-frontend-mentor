export const ProfilePhoto = ({url}) => (
    <div className="w-6 h-6 md:w-10 md:h-10 rounded-full border border-orange p-px">
        <img className="rounded-full w-full h-full object-cover"
            src={url}
            alt="Profile photo"
        />
    </div>
)