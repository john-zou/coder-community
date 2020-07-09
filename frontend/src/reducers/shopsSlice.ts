import { PayloadAction } from '@reduxjs/toolkit';
import { ShopApi, GetAllShopsDto, ShopDto } from './../api/api';
import { Shop } from './../store/types';
import { createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';



const shopsAdapter = createEntityAdapter<Shop>({
  selectId: shop => shop._id,
})

export const getAllShops = createAsyncThunk(
  'getAllShopsStatus',
  async () => {
    return await new ShopApi().shopControllerGetAllShops();
  }
);

export const createShop = createAsyncThunk(
  'createShopStatus',
  async (shop: any) => {
    const shopDto = {name: shop.name, description: shop.description};
    return await new ShopApi().shopControllerCreateShop(shopDto);
  }
)

// dispatch(createShop(shop))

export const shopsSlice = createSlice({
  name: 'shop',
  initialState: shopsAdapter.getInitialState(),
  reducers: {

  },
  extraReducers: {
    [getAllShops.fulfilled.type]: (state, action: PayloadAction<GetAllShopsDto>) => {
      const shopsToAdd = action.payload.shops;
      shopsAdapter.upsertMany(state, shopsToAdd);
    },
    [createShop.fulfilled.type]: (state, action: PayloadAction<ShopDto>) => {
      const shop: Shop = action.payload;
      shopsAdapter.addOne(state, shop);
    }
  }
})