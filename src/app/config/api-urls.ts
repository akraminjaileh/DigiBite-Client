const localURL: string = "https://localhost:7161";
const productionURL = "";
const BASE_URL: string = localURL;

export const apiUrls = {
    base: `${BASE_URL}`,
    account: {
        login: `${BASE_URL}/api/Account/Login`,
        signup: `${BASE_URL}/api/Account/Signup`,
        forgotPassword: `${BASE_URL}/api/Account/ForgotPassword`,
        resetPassword: `${BASE_URL}/api/Account/ResetPassword`,
        sendConfirmationEmail: `${BASE_URL}/api/Account/SendConfirmationEmail`,
        confirmEmail: `${BASE_URL}/api/Account/ConfirmEmail`,
        updateProfile: `${BASE_URL}/api/Account/UpdateProfile`,
        updateProfileImage: `${BASE_URL}/api/Account/UpdateProfileImage`,
        getProfile: `${BASE_URL}/api/Account/GetProfile`,
    },
    item: {
        item: `${BASE_URL}/api/Item`,
    },
    category: {
        category: `${BASE_URL}/api/Category`,

    },
    CustomerAction: {
        getCart: `${BASE_URL}/api/CustomerAction/Cart`,
        addToCart: `${BASE_URL}/api/CustomerAction/AddToCart`,
        updateQuantity: `${BASE_URL}/api/CustomerAction/UpdateQuantity`,
        address: `${BASE_URL}/api/CustomerAction/Address`,
        defaultAddress: `${BASE_URL}/api/CustomerAction/DefaultAddress`,
    },
};
