type MerchantProps = {
    image: string;
    name: string;
    city: string;
    id: string;
};

type ItemInterface = {
    id: string;
    image: string;
    merchant_id: string;
    name: string;
    price: string;
}

type RefundInterface = {
    id: string;
    main: string;
    review: string;
    caption: string;
    user: string;
    merchant: string;
    status: boolean;
    verdict: string;
    last_updated: string;
}

type RefundSingleInteraface = {
    id: string;
    main_image: string;
    review_image: string;
    caption: string;
    status: boolean;
}