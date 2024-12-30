export class PaymentMethodDTO {
    name: string;
    icon: string;
    value: string;
    constructor(name: string, icon: string, value: string) {
        this.name = name;
        this.icon = icon;
        this.value = value;
    }
}
