defmodule AllTogether.Repo.Migrations.CreateRecordings do
  use Ecto.Migration

  def change do
    create table(:recordings, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :path, :string
      add :song_id, references(:songs, type: :binary_id, on_delete: :delete_all)

      timestamps()
    end

  end
end
