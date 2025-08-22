"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { makeProducts, type productItem } from "@/data/demo-taka-data";

type ProductsUIState = {
  items: productItem[];
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

const ProductsUIContext = createContext<ProductsUIState | undefined>(undefined);

export function ProductsUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // generate items once
  const items = useMemo(
    () => (makeProducts ? (makeProducts(200) as productItem[]) : []),
    []
  );
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(16);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortBy, setSortBy] = useState("Default");

  const value = useMemo(
    () => ({
      items,
      pageIndex,
      setPageIndex,
      pageSize,
      setPageSize,
      globalFilter,
      setGlobalFilter,
      sortBy,
      setSortBy,
    }),
    [items, pageIndex, pageSize, globalFilter, sortBy]
  );

  return (
    <ProductsUIContext.Provider value={value}>
      {children}
    </ProductsUIContext.Provider>
  );
}

export function useProductsUI() {
  const ctx = useContext(ProductsUIContext);
  if (!ctx)
    throw new Error("useProductsUI must be used inside ProductsUIProvider");
  return ctx;
}
