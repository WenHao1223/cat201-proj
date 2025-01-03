const handleApiCall = async (
    url: string,
    method: string,
    body: any,
    onSuccess: (result: any) => void,
    onError: (error: string) => void
) => {
    try {
        const response = await fetch("http://localhost:9090/api/" + url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : null,
            credentials: "include",
        });

        if (response.ok) {
            const result = await response.json();
            onSuccess(result);
        } else {
            console.error("HTTP error", response.status, response.statusText);
            onError(response.statusText);
        }
    } catch (err) {
        onError((err as Error).message);
    }
};

export default handleApiCall;
