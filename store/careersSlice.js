import { createSlice } from '@reduxjs/toolkit'

export const careersSlice = createSlice({
    name: 'careers',
    initialState: {
      positions: [],
      totalPositions: 0,
    },
    reducers: {
      setInitialPositions: (state, action) => {
        state.positions = [...action.payload];
      },
      setTotalPositions: (state, action) => {
        state.totalPositions = action.payload;
      },
    },
  })

export const { setInitialPositions, setTotalPositions } = careersSlice.actions

export default careersSlice.reducer