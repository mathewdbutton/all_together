defmodule AllTogether.Recording do
  use Ecto.Schema
  import Ecto.Changeset
  @primary_key {:id, :binary_id, autogenerate: true}

  schema "recordings" do
    field :name, :string
    field :path, :string

    timestamps()
  end

  @doc false
  def changeset(recording, attrs) do
    recording
    |> cast(attrs, [:name, :path])
    |> validate_required([:name, :path])
  end
end
