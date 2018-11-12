defmodule AllTogether.Repo.Migrations.CreateRecordings do
  use Ecto.Migration

  def change do
    create table(:recordings, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :path, :string

      timestamps()
    end

  end
end
