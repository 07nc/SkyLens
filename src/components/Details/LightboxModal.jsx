import React from 'react';

export default function LightboxModal({ isOpen, photoData, onClose }) {

    if (!isOpen || !photoData || !photoData.imageUrl) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                padding: '20px',
                boxSizing: 'border-box'
            }}
        >
            <div
                style={{
                    position: 'relative',
                    maxWidth: '900px',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <button
                    onClick={() => onClose()}
                    style={{
                        position: 'absolute',
                        top: '-40px',
                        right: '0px',
                        background: 'transparent',
                        border: 'none',
                        color: '#f1f5f9',
                        fontSize: '26px',
                        cursor: 'pointer',
                        padding: '4px 8px'
                    }}
                >
                    ✕
                </button>

                <img
                    src={photoData.imageUrl}
                    alt="Aircraft Fullscreen"
                    style={{
                        maxWidth: '100%',
                        maxHeight: '75vh',
                        borderRadius: '8px',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
                        display: 'block'
                    }}
                />

                <div style={{
                    marginTop: '12px',
                    color: '#94a3b8',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <span>📷 Photo ©</span>
                    <a
                        href={photoData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#FF2A55',
                            textDecoration: 'none'
                        }}
                    >
                        {photoData.photographer}
                    </a>
                </div>
            </div>
        </div>
    );
}
