// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// URL dan anon key dari Supabase project kamu
const supabaseUrl = "https://pkmkoeyvgoddlfnqcbrw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbWtvZXl2Z29kZGxmbnFjYnJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MDYyOTAsImV4cCI6MjA3NDA4MjI5MH0.Db0uc4mvraUJw-zqaFbsujOX8K48hYQrPSX0k7mcmB8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
