import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const chhotuaayaApi = createApi({
  reducerPath: 'chhotuaayaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://chhotuaaya.com/public/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.data.auth_token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getGenerateOtpForLogin: builder.mutation({
      query: body => ({
        url: '/generate-otp-for-login',
        method: 'POST',
        body: body,
      }),
    }),
    getLoginWithOtp: builder.mutation({
      query: body => ({
        url: '/login-with-otp',
        method: 'POST',
        body: body,
      }),
    }),
    getSaveAddress: builder.mutation({
      query: body => ({
        url: '/save-address',
        method: 'POST',
        body: body,
      }),
    }),
    getAddresses: builder.mutation({
      query: body => ({
        url: '/get-addresses',
        method: 'POST',
        body: body,
      }),
    }),
    setDefaultAddress: builder.mutation({
      query: body => ({
        url: '/set-default-address',
        method: 'POST',
        body: body,
      }),
    }),
    getDeliveryRestaurants: builder.mutation({
      query: body => ({
        url: '/get-delivery-restaurants',
        method: 'POST',
        body: body,
      }),
    }),
    getRestaurantItems: builder.mutation({
      query: query => ({
        url: `/get-restaurant-items/${query}`,
        method: 'POST',
      }),
    }),
    getRestaurantInfoWithFavourite: builder.mutation({
      query: query => ({
        url: `/get-restaurant-info-with-favourite/${query}`,
        method: 'POST',
      }),
    }),
    toggleFavourite: builder.mutation({
      query: body => ({
        url: `/toggle-favorite`,
        method: 'POST',
        body: body,
      }),
    }),
    addItemsToCart: builder.mutation({
      query: body => ({
        url: `/check-cart-items-availability`,
        method: 'POST',
        body: body,
      }),
    }),
    getPaymentGateways: builder.mutation({
      query: body => ({
        url: `/get-payment-gateways`,
        method: 'POST',
        body: body,
      }),
    }),
    searchRestaurants: builder.mutation({
      query: body => ({
        url: `/search-restaurants`,
        method: 'POST',
        body: body,
      }),
    }),
    processRazorpayOrder: builder.mutation({
      query: body => ({
        url: `payment/process-razor-pay`,
        method: 'POST',
        body: body,
      }),
    }),
    placeOrder: builder.mutation({
      query: body => ({
        url: `/place-order`,
        method: 'POST',
        body: body,
      }),
    }),
    razorpayCreateOrder: builder.mutation({
      query: body => ({
        url: `/payment/razorpay/create-order`,
        method: 'POST',
        body: body,
      }),
    }),
    getOrders: builder.mutation({
      query: (body) => ({
        url: `/get-orders?page=${body.page}`,
        method: 'POST',
        body: body,
      }),
    }),
    getSingleItem: builder.mutation({
      query: body => ({
        url: `/get-single-item`,
        method: 'POST',
        body: body,
      }),
    }),
    updateUserInfo: builder.mutation({
      query: body => ({
        url: `/update-user-info`,
        method: 'POST',
        body: body,
      }),
    }),
    getDeliveryGuyGpsLocation: builder.mutation({
      query: body => ({
        url: `/delivery/get-delivery-guy-gps-location`,
        method: 'POST',
        body: body,
      }),
    }),
    getFavouriteStores: builder.mutation({
      query: body => ({
        url: `/get-favorite-stores`,
        method: 'POST',
        body: body,
      }),
    }),
    cancelOrder: builder.mutation({
      query: body => ({
        url: `/cancel-order`,
        method: 'POST',
        body: body,
      }),
    }),
    getWalletTransactions: builder.mutation({
      query: body => ({
        url: `/get-wallet-transactions`,
        method: 'POST',
        body: body,
      }),
    }),
    getUserNotifications: builder.mutation({
      query: body => ({
        url: `/get-user-notifications`,
        method: 'POST',
        body: body,
      }),
    }),
    deleteAddress: builder.mutation({
      query: body => ({
        url: `/delete-address`,
        method: 'POST',
        body: body,
      }),
    }),
    promoSlider: builder.mutation({
      query: body => ({
        url: `/promo-slider`,
        method: 'POST',
        body: body,
      }),
    }),
    applyCoupon: builder.mutation({
      query: body => ({
        url: `/apply-coupon`,
        method: 'POST',
        body: body,
      }),
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useGetGenerateOtpForLoginMutation,
  useGetLoginWithOtpMutation,
  useGetSaveAddressMutation,
  useGetAddressesMutation,
  useSetDefaultAddressMutation,
  useGetDeliveryRestaurantsMutation,
  useGetRestaurantItemsMutation,
  useGetRestaurantInfoWithFavouriteMutation,
  useToggleFavouriteMutation,
  useAddItemsToCartMutation,
  useGetPaymentGatewaysMutation,
  useSearchRestaurantsMutation,
  useProcessRazorpayOrderMutation,
  usePlaceOrderMutation,
  useGetOrdersMutation,
  useGetSingleItemMutation,
  useUpdateUserInfoMutation,
  useGetDeliveryGuyGpsLocationMutation,
  useGetFavouriteStoresMutation,
  useCancelOrderMutation,
  useGetWalletTransactionsMutation,
  useGetUserNotificationsMutation,
  useDeleteAddressMutation,
  useRazorpayCreateOrderMutation,
  usePromoSliderMutation,
  useApplyCouponMutation
} = chhotuaayaApi;
