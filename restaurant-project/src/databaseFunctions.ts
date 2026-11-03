import { useEffect, useState } from "react";
import api from "./api";

function useApiValue<T>(path?: string, initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(initialValue);
  useEffect(() => {
    if (!path) return;
    let active = true;
    api.get(path)
      .then((response) => { if (active) setValue(response.data); })
      .catch((error) => console.error(error));
    return () => { active = false; };
  }, [path]);
  return value;
}

function useApiList(path?: string) {
  return useApiValue<any[]>(path, []) || [];
}

export function getRepresentativeById(id: unknown) {
  return useApiValue<any>(id ? `/getRepresentative/${id}` : undefined, {}) || {};
}

export function getAllRepresentatives() {
  return useApiList("/getAllRepresentatives");
}

export function getCustomerById(id: unknown) {
  const customer = useApiValue<any>(id ? `/getCustomer/${id}` : undefined, {});
  return customer?.first_name;
}

export function getAllCustomers() {
  return useApiList("/getAllCustomers");
}

export function getCategory(id: unknown) {
  const category = useApiValue<any>(id ? `/getCategory/${id}` : undefined, {});
  return category?.category_name;
}

export function getAllCategories() {
  return useApiList("/getAllCategories");
}

export function getAllDishes() {
  return useApiList("/getAllDishes");
}

export function getAllDishesByRepId(repId: unknown) {
  return useApiList(repId ? `/getAllDishesByRepId/${repId}` : undefined);
}

export function getAllDishesByRepIdAndCategoryId(repId: unknown, category: unknown) {
  return useApiList(repId && category ? `/getAllDishesByRepIdAndCategoryId/${repId}/${category}` : undefined);
}

export function getAllCategoriesByRepId(repId: unknown) {
  return useApiList(repId ? `/getAllCategoriesByRepId/${repId}` : undefined);
}

export function getAllCategoriesByRepIdAndCategoryId(repId: unknown, categoryId: unknown) {
  return useApiList(repId && categoryId ? `/getAllCategoriesByRepIdAndCategoryId/${repId}/${categoryId}` : undefined);
}

export function getAllPromotionsByRepId(repId: unknown) {
  return useApiList(repId ? `/getAllPromotionsByRepId/${repId}` : undefined);
}

export function getAllReservationsByRepId(repId: unknown) {
  return useApiList(repId ? `/getAllReservationsByRepId/${repId}` : undefined);
}

export function getAllReservationsByRepIdAndCustomerId(repId: unknown, customerId: unknown) {
  return useApiList(repId && customerId ? `/getAllReservationsByRepIdAndCustomerId/${repId}/${customerId}` : undefined);
}

export function getAllReservationsByCustomerId(customerId: unknown) {
  return useApiList(customerId ? `/getAllReservationsByCustomerId/${customerId}` : undefined);
}
