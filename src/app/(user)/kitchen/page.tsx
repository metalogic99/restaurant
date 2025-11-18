"use client";
import AdminError from "@/components/admin/AdminError";
import OrderDetailCard from "@/components/order/OrderDetailCard";
import CommonSection from "@/components/shared/CommonSection";
import Loading from "@/components/shared/Loading";
import { useGetOrderbyStatus } from "@/hooks/order.hooks";
import useSocketEvents from "@/utils/socketHandler";
import React from "react";

const Kitchen = () => {
  const { data, isLoading, error } = useGetOrderbyStatus("pending");
  useSocketEvents();
  if (error) {
    return <AdminError error={error} />;
  }
  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  if (!data) {
    return <AdminError error="Data is undefined" />;
  }
  return (
    <CommonSection>
      <span className="text-2xl font-semibold uppercase text-forestGreen">
        Kitchen Interface
      </span>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-5 gap-8">
        {data?.data.map((order) => (
          <OrderDetailCard order={order} key={order._id} />
        ))}
      </section>
    </CommonSection>
  );
};

export default Kitchen;
