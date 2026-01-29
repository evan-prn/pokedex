import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface GenerationState {
    currentGen: number;
}

const initialState: GenerationState = {
    currentGen: 1,
};

export const generationSlice = createSlice({
    name: 'generation',
    initialState,
    reducers: {
        setGeneration: (state, action: PayloadAction<number>) => {
            state.currentGen = action.payload;
        },
    },
});

export const { setGeneration } = generationSlice.actions;
export default generationSlice.reducer;