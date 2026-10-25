import { CAL_ACCOUNT } from "@/lib/services";

/** The Cal.com account every booking button points at. Set by CAL_USERNAME at build time. */
export const CAL_USERNAME = CAL_ACCOUNT;

/** The one embed namespace. CalProvider and every BookButton must use this same value. */
export const CAL_NAMESPACE = "caleira";
