const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://sntgnycotxqxxlsmjvis.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNudGdueWNvdHhxeHhsc21qdmlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIyMzc5NTcsImV4cCI6MjAyNzgxMzk1N30.JTc-EB6otzEtsRKgkpwidaDCQJGR9TBFt-R8DAZbVwo"

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);


module.exports = supabase;