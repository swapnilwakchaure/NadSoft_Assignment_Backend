"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3030;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Server Connected" });
}));
app.use("/api", routes_1.indexRouter);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.supabase;
        console.log(`Server is running on port ${port}`);
    }
    catch (error) {
        console.log(`Error while starting the error: ${error}`);
    }
}));
