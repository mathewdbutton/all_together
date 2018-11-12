use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :all_together, AllTogetherWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :all_together, AllTogether.Repo,
  username: "postgres",
  password: "postgres",
  database: "all_together_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
