import { api } from '@/constant'
import { AuthRequest } from '@/utils/apiRequest'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


type InitialState = {
    isLoading: boolean
    infoLogin: LoginInfo,
    message: any
}
const initialState: InitialState = {
    isLoading: false,
    infoLogin: {
        user_name: '',
        point: 0,
        address: ''
    },
    message: {}
}
type LoginInfo = {
    user_name: string;
    point: number;
    address: string;
}
type IDataSubmit = {
    user_name: string;
    password: string;
}
// Generates pending, fulfilled and rejected action types
export const login = createAsyncThunk('auth/login', async (param: IDataSubmit, { rejectWithValue }) => {
    try {
        const response = await AuthRequest.post(api?.auth.login, param)
        localStorage.setItem('token', response?.data?.data?.token);
        localStorage.setItem('user_name', response?.data?.data?.user_name);
        return response
    }
    catch (err) {
        rejectWithValue(err)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogin: (state, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, {payload}) => {
            state.infoLogin = {
                user_name: payload?.data?.data?.user_name,
                point: payload?.data?.data?.point || 0,
                address: payload?.data?.data?.address || ''
            }
            state.isLoading = false
        })
        builder.addCase(login.rejected, (state, action) => {
            state.message = action.payload
            state.isLoading = false
        })
    },

})
export default userSlice.reducer
export const { setIsLogin } = userSlice.actions
