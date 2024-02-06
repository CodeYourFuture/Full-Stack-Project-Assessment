const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://wanmmghxauzognxnacro.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhbm1tZ2h4YXV6b2dueG5hY3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYyMTE1NjMsImV4cCI6MjAyMTc4NzU2M30.apJ9wbBSzaaXaPAO4J2nZcP0KkZcfI62_aWM6rzjipw"
console.log(supabaseUrl)

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;