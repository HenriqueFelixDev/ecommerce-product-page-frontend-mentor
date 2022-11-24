const buttonTypes = {
    'primary': 'text-pale-orange bg-orange shadow-pale-orange'
}

export const Button = ({type = 'primary', className, children, ...props}) => (
    <button
        className={`flex justify-center items-center gap-4 py-3 shadow-xl px-8 rounded-lg text-sm font-bold disabled:bg-gray-400 transition-all ${buttonTypes[type]} ${className}`}
        {...props}
        >
            { children }
    </button>
)