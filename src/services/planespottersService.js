export async function fetchAircraftPhoto(registration) {
    if (!registration) {
        return null;
    }

    try {
        const url = 'https://api.planespotters.net/pub/photos/reg/' + registration;
        const response = await fetch(url);

        if (!response.ok) {
            console.error('Planespotters API error:', response.status);
            return null;
        }

        const data = await response.json();

        if (!data.photos || data.photos.length === 0) {
            return null;
        }

        const photo = data.photos[0];

        let imageUrl = null;
        if (photo.thumbnail_large) {
            imageUrl = photo.thumbnail_large.src;
        } else if (photo.thumbnail) {
            imageUrl = photo.thumbnail.src;
        }

        return {
            imageUrl: imageUrl,
            photographer: photo.photographer || 'Unknown',
            link: photo.link || 'https://www.planespotters.net',
        };

    } catch (error) {
        console.error('Planespotters fetch failed:', error);
        return null;
    }
}
