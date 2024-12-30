export interface VoucherUserDTO {
    id: number;
    code: string;
    discountAmount: number;
    isPercentage: boolean;
    expirationDate: string;
    scheduleStartDate: string;
    minimumOrderAmount: number;
    maxUsagesPerUser: number;
    usagesLeft: number;
}