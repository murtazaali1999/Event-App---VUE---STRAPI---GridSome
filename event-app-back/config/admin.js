module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '26f848d2da5e83a78d7af5d93bcbd436'),
  },
});
