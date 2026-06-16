export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        
        // 1. Check content-type header
        const contentType = request.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return new Response(JSON.stringify({ error: "Content-Type must be application/json" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }
        
        // 2. Parse request JSON body
        const { name, email, message } = await request.json();
        
        // 3. Simple backend validation
        if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
            return new Response(JSON.stringify({ error: "All fields are required" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
            });
        }
        
        // 4. Verify D1 database binding exists
        if (!env.DB) {
            return new Response(JSON.stringify({ error: "D1 Database binding 'DB' is not configured in settings." }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
        
        // 5. Execute SQL insert using safe binding parameters
        await env.DB.prepare(
            "INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)"
        )
        .bind(name.trim(), email.trim(), message.trim())
        .run();
        
        // 6. Return successful JSON response
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 
                "Content-Type": "application/json"
            }
        });
        
    } catch (err) {
        return new Response(JSON.stringify({ error: "Internal Server Error", message: err.toString() }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
