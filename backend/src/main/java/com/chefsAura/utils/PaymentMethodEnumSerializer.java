package com.chefsAura.utils;

import com.chefsAura.enums.PaymentMethodEnum;
import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import java.lang.reflect.Type;

public class PaymentMethodEnumSerializer implements JsonSerializer<PaymentMethodEnum> {
    @Override
    public JsonElement serialize(PaymentMethodEnum src, Type typeOfSrc, JsonSerializationContext context) {
        return context.serialize(src.getMethod());
    }
}
