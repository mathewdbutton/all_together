defmodule AllTogether.Songs.Song do
  use Ecto.Schema
  import Ecto.Changeset
  @primary_key {:id, :binary_id, autogenerate: true}

  schema "songs" do
    field :name, :string
    has_many :recordings, AllTogether.Recording

    timestamps()
  end

  @doc false
  def changeset(song, attrs) do
    song
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
