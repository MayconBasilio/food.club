"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connectDb_1 = require("./db/connectDb");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const company_routes_1 = __importDefault(require("./routes/company.routes"));
const restaurant_routes_1 = __importDefault(require("./routes/restaurant.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Lista de origens permitidas
        const allowedOrigins = [
            "http://localhost:5173",
            "https://foodclub2.netlify.app",
        ];
        // Permitir requisições sem 'origin' (como ferramentas locais como Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Não permitido pela política de CORS"));
        }
    },
    credentials: true, // Permitir cookies
}));
app.use((0, cookie_parser_1.default)());
const PORT = process.env.PORT || 3000;
//Rotas
app.use("/api/auth", auth_routes_1.default);
app.use("/api/company", company_routes_1.default);
app.use("/api/restaurant", restaurant_routes_1.default);
app.use("/api/employee", employee_routes_1.default);
const startServer = async () => {
    try {
        await (0, connectDb_1.connectDB)();
        console.log("MongoDB conectado!");
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    }
    catch (error) {
        console.error("Erro ao iniciar o servidor:", error);
        process.exit(1);
    }
};
exports.startServer = startServer;
(0, exports.startServer)();
