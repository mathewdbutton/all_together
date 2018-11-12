defmodule AllTogether.Repo do
  use Ecto.Repo,
    otp_app: :all_together,
    adapter: Ecto.Adapters.Postgres
end
