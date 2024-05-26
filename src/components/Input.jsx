import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    borderColor = "#ccc", // Couleur de la bordure par défaut
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full flex items-center'>
            {label && (
                <label 
                    className='inline-block mb-1 pl-1 mr-2'
                    htmlFor={id}
                    //label
                    style={{ 
                        minWidth: '100px',
                        display: 'block', // Affiche le label comme un bloc
                        marginBottom: '0.5rem', // Marge inférieure de 0.5rem
                        fontSize: '1rem', // Taille de la police de base
                        fontWeight: 'bold', // Texte en gras
                        color: 'rgb(240, 250, 248)', // Couleur du texte
                    }}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 ${className}`}
                ref={ref}
                {...props}
                id={id}
                style={{
                    borderRadius: '0.5rem', // Rayon de bordure
                    border: '1px solid pink', // Couleur et style de la bordure
                    fontSize: '1rem', // Taille de la police
                    color: '#333', // Couleur du texte  blue
                    backgroundColor: '#fff', // Couleur de fond  oranger
                    transition: 'border-color 0.8s ease', // Transition douce pour la couleur de la bordure
                    width: '65%', // Largeur de l'entrée pour remplir l'espace restant
                }}
            />
        </div>
    );
});

export default Input;
