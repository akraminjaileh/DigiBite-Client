const localURL: string = "https://localhost:7161";
const productionURL = "";
const BASE_URL: string = localURL;

export const apiUrls = {
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
};
