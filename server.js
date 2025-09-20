const allowedOrigins = [
  "https://startup-project.netlify.app",  // ✅ Netlify live frontend
  "http://localhost:3000",                // Dev local
  "http://127.0.0.1:3000",
  /^http:\/\/localhost:\d+$/,             // ✅ Any random localhost port (Flutter Web dev)
  /^http:\/\/127\.0\.0\.1:\d+$/           // ✅ 127.x.x.x ports
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow mobile apps / curl
    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.some(o => o instanceof RegExp && o.test(origin))
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Very important for preflight
app.options("*", cors());