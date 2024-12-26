package com.chefsAura.utils;

import com.chefsAura.enums.OrderStatusEnum;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;

import java.lang.reflect.Type;

public class OrderStatusEnumDeserializer implements JsonDeserializer<OrderStatusEnum> {
    @Override
    public OrderStatusEnum deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) {
        return OrderStatusEnum.fromString(json.getAsString());
    }
}
