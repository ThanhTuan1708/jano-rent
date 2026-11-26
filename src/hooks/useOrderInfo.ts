"use client";

import { useEffect } from "react";
import { EMPTY_CUSTOMER, generateOrderCode, type CustomerInfo } from "@/lib/cart";
import { usePersistentState } from "./usePersistentState";

/** Thông tin khách + mã đơn, lưu localStorage để không mất khi reload */
export function useOrderInfo() {
  const [customer, setCustomer] = usePersistentState<CustomerInfo>("jano-customer-v1", EMPTY_CUSTOMER);
  const [orderCode, setOrderCode, codeReady] = usePersistentState<string>("jano-order-code-v1", "");

  useEffect(() => {
    if (codeReady && !orderCode) setOrderCode(generateOrderCode());
  }, [codeReady, orderCode, setOrderCode]);

  const renewOrderCode = () => setOrderCode(generateOrderCode());

  return { customer, setCustomer, orderCode, renewOrderCode };
}

export type OrderInfoApi = ReturnType<typeof useOrderInfo>;
