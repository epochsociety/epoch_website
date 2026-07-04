const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// 1. Parse .env file manually
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.error("Error: .env file does not exist. Please create one.");
  process.exit(1);
}

const dotenvContent = fs.readFileSync(envPath, "utf8");
const env = {};
dotenvContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || "";
    if (value.startsWith('"') && value.endsWith('"'))
      value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'"))
      value = value.slice(1, -1);
    env[match[1]] = value.trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

if (
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl.includes("your-project-id")
) {
  console.error(
    "Error: Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file with your actual Supabase credentials.",
  );
  process.exit(1);
}

// 2. Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runSeed() {
  console.log("Connecting to Supabase project:", supabaseUrl);

  // Seed Credentials Table
  console.log("Seeding credentials...");
  const { error: credsErr } = await supabase.from("epoch_creds").upsert([
    {
      role: "developer",
      username: "developer",
      password: "epoch@dev2026",
      updated_at: new Date().toISOString(),
    },
    {
      role: "faculty",
      username: "faculty",
      password: "epoch@faculty2026",
      updated_at: new Date().toISOString(),
    },
  ]);

  if (credsErr) {
    console.error("Failed to seed credentials:", credsErr.message);
    console.error("Details:", credsErr.details || credsErr.hint);
  } else {
    console.log(
      "✓ Successfully inserted developer and faculty logins to 'epoch_creds'!",
    );
  }

  // Seed Site Content Table
  console.log("Seeding global site settings...");
  const { error: contentErr } = await supabase.from("epoch_content").upsert({
    id: "global",
    data: {
      globalTheme: "default",
      heroTitle: "Epoch Society",
      heroSubtitle: "Tech · Innovation · Creativity",
      heroTagline:
        "A collective of curious minds shaping the next chapter of human-computer creativity.",
      counterTarget: 240,
      counterLabel: "Active builders worldwide",
      counterEnabled: true,
      aboutText:
        "We host hackathons, design jams, and intimate talks where engineers, artists, and dreamers turn ideas into prototypes.",
      timerEventDate: "2026-10-01",
      timerEventTime: "10:00",
      timerEnabled: true,
      timerColor: "var(--brand-purple)",
      timerBorderColor: "var(--brand-pink)",
      timerEffect: "glow",
      timerLayout: "merged",
      subtitleColor: "var(--muted-foreground)",
      subtitleIcon: "sparkle",
      subtitleIconEffect: "none",
    },
  });

  if (contentErr) {
    console.error("Failed to seed content settings:", contentErr.message);
  } else {
    console.log("✓ Successfully inserted site content configuration!");
  }
}

runSeed();
