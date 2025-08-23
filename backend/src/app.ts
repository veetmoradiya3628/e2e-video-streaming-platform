import express from "express";
import itemRoutes from "./routes/itemRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import videoRoutes from "./routes/videoRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'E2E Video Streaming Platform API',
		version: '1.0.0',
		description: 'API documentation for the E2E Video Streaming Platform',
	},
	servers: [
		{ url: 'http://localhost:3000', description: 'Local server' },
	],
};

const options = {
	swaggerDefinition,
	apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/items", itemRoutes);
app.use("/api/videos", videoRoutes)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

// Root endpoint for docs link
app.get('/', (req, res) => {
	res.send('API server running. See <a href="/api-docs">/api-docs</a> for Swagger UI.');
});

export default app;
