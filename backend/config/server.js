module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "35e48ac28986f43eab9cd62471372e6f"),
    },
  },
  url: "http://localhost:1337",
});
