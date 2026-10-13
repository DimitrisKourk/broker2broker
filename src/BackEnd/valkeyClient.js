import { GlideClient, GlideClusterClient, Logger } from "@valkey/valkey-glide";
// When Valkey is in standalone mode, add address of the primary node, and any replicas you'd like to be able to read from.
const addresses = [
    {
        host: "localhost",
        port: 6379,
    },
];
// Check `GlideClientConfiguration/GlideClusterClientConfiguration` for additional options.
const valkeyClient = await GlideClient.createClient({
    addresses: addresses,
    // if the server uses TLS, you'll need to enable it. Otherwise, the connection attempt will time out silently.
    // useTLS: true,
    // It is recommended to set a timeout for your specific use case
    requestTimeout: 5000, // 500ms timeout
    clientName: "test_standalone_client",
});


console.log(await valkeyClient.echo("Valkey Glide Client connected successfully"));



export {valkeyClient};