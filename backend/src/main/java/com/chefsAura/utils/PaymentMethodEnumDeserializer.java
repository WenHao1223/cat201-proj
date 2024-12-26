package com.chefsAura.utils;

import com.chefsAura.enums.PaymentMethodEnum;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;

import java.lang.reflect.Type;

public class PaymentMethodEnumDeserializer implements JsonDeserializer<PaymentMethodEnum> {
    @Override
    public PaymentMethodEnum deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) {
        return PaymentMethodEnum.fromString(json.getAsString());
    }
}
