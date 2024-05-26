import React from "react";

export default function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg bg-orange-500 text-white ${className}`}
            style={{
                padding: '0.5rem 1rem', // Ajustez le rembourrage selon vos besoins
                borderRadius: '0.375rem', // Ajustez le rayon de bordure selon vos besoins
                backgroundColor:'orange', // Couleur de fond orange
                color: '#ffffff', // Couleur de texte blanche
                border: 'none', // Supprime la bordure
                cursor: 'pointer', // Change le curseur en pointeur au survol
                transition: 'background-color 0.3s ease',
                width:'150px' // Transition douce lors du survol
            }}
            {...props}
        >
            {children}
        </button>
    );
}
