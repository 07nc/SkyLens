import { createSlice } from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState: JSON.parse(localStorage.getItem('watchlist') || '[]'),
    reducers: {
        toggleWatchlist: (state, action) => {
            const flight = action.payload;
            const index = state.findIndex(
                f => f.id === flight.id || (flight.callsign && f.callsign === flight.callsign)
            );

            if (index >= 0) {
                state.splice(index, 1);
            } else {
                state.push(flight);
            }
            localStorage.setItem('watchlist', JSON.stringify(state));
        },
        removeFromWatchlist: (state, action) => {
            const id = action.payload;
            const updated = state.filter(f => f.id !== id && f.callsign !== id);
            localStorage.setItem('watchlist', JSON.stringify(updated));
            return updated;
        },
        clearWatchlist: () => {
            localStorage.removeItem('watchlist');
            return [];
        }
    }
});

export const { toggleWatchlist, removeFromWatchlist, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
