import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-7e40671b/health", (c) => {
  return c.json({ status: "ok" });
});

// Debug endpoint to check KV store directly (remove in production)
app.get("/make-server-7e40671b/debug/leads", async (c) => {
  try {
    console.log('DEBUG: Checking KV store directly');
    const leads = await kv.getByPrefix('lead:');
    console.log('DEBUG: Found', leads.length, 'leads');
    return c.json({ 
      success: true, 
      count: leads.length,
      leads: leads,
      message: 'This is a debug endpoint - shows all leads without auth' 
    });
  } catch (error) {
    console.error('DEBUG: Error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Submit lead endpoint
app.post("/make-server-7e40671b/leads", async (c) => {
  try {
    const body = await c.req.json();
    console.log('Received lead submission:', body);
    
    const { name, phone, email, service, budget } = body;

    // Validate required fields
    if (!name || !phone || !service) {
      console.error('Validation error: Missing required fields', { name, phone, service });
      return c.json({ error: 'Missing required fields: name, phone, or service' }, 400);
    }

    // Create lead object
    const lead = {
      id: crypto.randomUUID(),
      name,
      phone,
      email: email || '',
      service,
      budget: budget || '',
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    console.log('Attempting to save lead:', lead);

    // Save to KV store with key pattern: lead:{id}
    try {
      await kv.set(`lead:${lead.id}`, lead);
      console.log('Lead saved successfully to KV store:', lead.id);
    } catch (kvError) {
      console.error('KV store error:', kvError);
      return c.json({ error: `Database error: ${kvError.message}` }, 500);
    }

    return c.json({ success: true, leadId: lead.id, message: 'Lead submitted successfully!' });
  } catch (error) {
    console.error('Error saving lead - Full error:', error);
    return c.json({ error: `Failed to save lead: ${error.message}` }, 500);
  }
});

// Get all leads endpoint (protected)
app.get("/make-server-7e40671b/leads", async (c) => {
  try {
    console.log('GET /leads - Request received');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    console.log('Access token present:', !!accessToken);
    
    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    console.log('Auth check - User:', user?.id, 'Error:', error?.message);
    
    if (!user || error) {
      console.error('Authorization failed:', error?.message);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    console.log('Fetching leads from KV store with prefix: "lead:"');
    // Get all leads from KV store
    const leads = await kv.getByPrefix('lead:');
    console.log('Leads retrieved from KV store:', leads.length, 'leads found');
    console.log('Raw leads data:', JSON.stringify(leads, null, 2));
    
    // Sort by submission date (newest first)
    const sortedLeads = leads.sort((a, b) => {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });

    console.log('Returning sorted leads:', sortedLeads.length);
    return c.json({ success: true, leads: sortedLeads });
  } catch (error) {
    console.error('Error fetching leads - Full stack:', error);
    return c.json({ error: `Failed to fetch leads: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);