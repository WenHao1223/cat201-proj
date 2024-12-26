import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.Type;

public class CustomGsonBuilder {
    private final GsonBuilder gsonBuilder;

    public CustomGsonBuilder() {
        this.gsonBuilder = new GsonBuilder();
        this.gsonBuilder.registerTypeAdapter(Object.class, new CustomTypeAdapter());
    }

    public Gson create() {
        return gsonBuilder.create();
    }

    private static class CustomTypeAdapter extends TypeAdapter<Object> {
        private final Gson gson = new Gson();

        @Override
        public void write(JsonWriter out, Object value) throws IOException {
            out.setIndent("    "); // 4 spaces
            gson.toJson(value, value.getClass(), out);
        }

        @Override
        public Object read(JsonReader in) throws IOException {
            return gson.fromJson(in, Object.class);
        }
    }
}