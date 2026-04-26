import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Client for backend operations (requires SANITY_API_TOKEN with read/write access)
export const adminClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // Ensure fresh data for auth operations
  token: process.env.SANITY_API_TOKEN, 
});
