import {serve} from "https://deno.land/std@0.156.0/http/server.ts";
import handler from './todos-backend/handler.ts';

// To listen on port 4242.
await serve(handler, {port: 4242});

