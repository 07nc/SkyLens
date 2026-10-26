import React from 'react';

export default function AircraftPhotoCard({ photoData, onClickPhoto }) {

    if (!photoData || !photoData.imageUrl) {
        return (
            <div style={{
                width: '100%',
                height: '160px',
                backgroundColor: '#1a0505',
                border: '1px solid #26313d',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '13px',
            }}>
                No aircraft photo available
            </div>
        );
    }

    return (
        <div
            style={{
                width: '100%',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                border: '1px solid #26313d',
            }}
            onClick={() => onClickPhoto()}
        >
            <img
                src={photoData.imageUrl}
                alt="Aircraft"
                style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    display: 'block',
                }}
            />

            <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '6px 10px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
            }}>
                <span style={{ fontSize: '11px' }}>📷</span>
                <a
                    href={photoData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        textDecoration: 'none',
                    }}
                >
                    © {photoData.photographer}
                </a>
            </div>
        </div>
    );
}
