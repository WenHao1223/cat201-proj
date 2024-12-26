package com.chefsAura.utils;

import com.chefsAura.enums.OrderStatusEnum;
import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;

public class OrderStatusEnumSerializer implements JsonSerializer<OrderStatusEnum> {
    @Override
    public JsonElement serialize(OrderStatusEnum src, Type typeOfSrc, JsonSerializationContext context) {
        return context.serialize(src.getStatus());
    }
}
