import { locale } from "../consts/locale";

export const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
