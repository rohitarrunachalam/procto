import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qejulmevhpnqwehahjuw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlanVsbWV2aHBucXdlaGFoanV3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTU0OTI5NSwiZXhwIjoyMDExMTI1Mjk1fQ.Xt9-rV7XLGzJlQbi9hJVgL2rESx4ZcQzFl8cvrC-0QM';

export const supabase = createClient(supabaseUrl, supabaseKey);



