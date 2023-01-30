import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fafpyfgqkddgcjtxsvjo.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhZnB5Zmdxa2RkZ2NqdHhzdmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUxMTU0NTUsImV4cCI6MTk5MDY5MTQ1NX0.V3Jd53LjofuRF4M7poOMiAjSFM4bOyvGWHHIAO9KbPk'
const supabase = createClient(supabaseUrl, supabaseKey)

console.log(supabase)